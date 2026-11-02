from pathlib import Path
import json
import sys, threading
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright,expect

out=Path(r'C:\Users\USER\Desktop\rital-events-showcase\verification');out.mkdir(exist_ok=True)
base='http://localhost:5177'
static_server=None
if '--static' in sys.argv:
 base='http://localhost:5178'
 class Handler(SimpleHTTPRequestHandler):
  def __init__(self,*args,**kwargs):super().__init__(*args,directory=r'C:\Users\USER\Desktop\rital-events-showcase\dist',**kwargs)
  def do_GET(self):
   if not Path(self.translate_path(self.path)).exists() and '.' not in self.path.rsplit('/',1)[-1]:self.path='/index.html'
   super().do_GET()
  def log_message(self,*args):pass
 static_server=ThreadingHTTPServer(('127.0.0.1',5178),Handler)
 threading.Thread(target=static_server.serve_forever,daemon=True).start()
errors=[];requests=[];checks=[]
def check(condition,label):
 if not condition: raise AssertionError(label)
 checks.append(label)
def screenshot(page,name):
 for y in range(0,page.evaluate('document.documentElement.scrollHeight'),650):
  page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(90)
 page.wait_for_function("Array.from(document.images).every(i=>i.complete)",timeout=30000)
 page.evaluate('scrollTo(0,0)');page.wait_for_timeout(150)
 page.screenshot(path=str(out/name),full_page=True)

with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True)
 page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('request',lambda r:requests.append(r.url))
 for route in ['/','/services','/catalogue','/realisations','/a-propos','/contact']:
  response=page.goto(base+route,wait_until='networkidle',timeout=60000)
  page.locator('h1').wait_for()
  check(response.status==200,'Route accessible : '+route)
  check(page.locator('h1').count()==1,'Un titre principal : '+route)
  check(page.evaluate('document.documentElement.scrollWidth <= innerWidth'),'Aucun débordement ordinateur : '+route)
  if route=='/':screenshot(page,'accueil-ordinateur.png')
 page.goto(base+'/catalogue',wait_until='networkidle')
 expect(page.locator('.product-card')).to_have_count(53,timeout=30000)
 check(page.locator('.product-card').count()==53,'53 références tarifées, variantes comprises')
 page.get_by_role('textbox',name='Rechercher un article').fill('chanel')
 check(page.locator('.product-card').count()==2,'Recherche dans les articles')
 page.get_by_role('textbox',name='Rechercher un article').fill('inexistant')
 check(page.locator('.empty-state').is_visible(),'Recherche sans résultat')
 page.get_by_role('button',name='Réinitialiser la recherche').click()
 page.get_by_role('button',name='Tentes et structures',exact=True).click()
 check(page.locator('.product-card').count()==7,'Filtre des structures')
 page.get_by_role('button',name='Tout',exact=True).click()
 page.get_by_role('spinbutton',name='Quantité : Chaise Chanel dorée',exact=True).fill('10')
 page.get_by_role('spinbutton',name='Quantité : Table ronde',exact=True).fill('2')
 check('17' in page.locator('.basket-total').inner_text() and '000' in page.locator('.basket-total').inner_text(),'Calcul 10 chaises + 2 tables : 17 000 F CFA')
 page.get_by_role('checkbox',name='Voir casse / perte').check()
 check(page.locator('.loss-price').first.is_visible(),'Consultation des montants casse / perte')
 page.reload(wait_until='networkidle')
 check(page.get_by_role('spinbutton',name='Quantité : Chaise Chanel dorée',exact=True).input_value()=='10','Sélection conservée après rechargement')
 screenshot(page,'catalogue-ordinateur.png')
 page.get_by_role('link',name='Préparer ma demande',exact=True).click()
 page.locator('input[name=name]').fill('Client de test')
 page.locator('input[name=phone]').fill('+2250700000000')
 page.locator('select[name=event]').select_option(label='Mariage')
 page.locator('input[name=place]').fill('Abidjan, lieu de test')
 page.locator('input[name=guests]').fill('100')
 page.locator('textarea[name=message]').fill('Ceci est un test local, aucune demande ne doit être envoyée.')
 page.get_by_role('button',name='Préparer ma demande',exact=True).click()
 page.locator('#prepared-message').wait_for()
 text=page.locator('#prepared-message pre').inner_text()
 check('Chaise Chanel dorée : 10' in text and 'Table ronde : 2' in text,'Articles repris dans la demande')
 href=page.get_by_role('link',name='Ouvrir WhatsApp',exact=True).get_attribute('href')
 check(parse_qs(urlparse(href).query)['text'][0]==text,'Message WhatsApp complet et correctement encodé')
 check(not any('supabase' in u or '/api/contact' in u for u in requests),'Aucun envoi automatique vers un service distant')
 screenshot(page,'demande-preparee.png')
 page.goto(base+'/realisations',wait_until='networkidle')
 check(page.locator('.gallery-item').count()==64,'64 visuels dans la galerie')
 page.locator('.gallery-item').first.click()
 check(page.get_by_role('dialog').is_visible(),'Agrandissement du visuel')
 page.keyboard.press('ArrowRight')
 check('2 / 64' in page.locator('.lightbox figcaption').inner_text(),'Navigation clavier dans les visuels')
 page.keyboard.press('Escape')
 check(page.get_by_role('dialog').count()==0,'Fermeture du visuel par Échap')
 for i in range(1,65):
  for suffix in ['', '-thumb']:
   r=page.request.get(base+f'/catalogue/{i:02}{suffix}.webp')
   check(r.status==200 and r.headers.get('content-type','').startswith('image/'),f'Visuel {i:02}{suffix} accessible')
 r=page.request.get(base+'/Tarifs-Rital-Events.pdf')
 check(r.status==200 and r.body().startswith(b'%PDF'),'PDF original téléchargeable')
 page.set_viewport_size({'width':390,'height':844})
 for route in ['/','/services','/catalogue','/realisations','/a-propos','/contact']:
  page.goto(base+route,wait_until='networkidle')
  check(page.evaluate('document.documentElement.scrollWidth <= innerWidth'),'Aucun débordement mobile : '+route)
  if route=='/':
   screenshot(page,'accueil-mobile.png')
   page.get_by_role('button',name='Ouvrir le menu',exact=True).click()
   page.locator('.mobile-nav').get_by_role('link',name='Catalogue',exact=True).click()
   check(page.url.endswith('/catalogue'),'Navigation mobile fonctionnelle')
  if route=='/contact':screenshot(page,'contact-mobile.png')
 page.evaluate("localStorage.removeItem('rital-selection-v1')")
 check(not errors,'Aucune erreur JavaScript : '+str(errors))
 browser.close()
(out/'resultats.json').write_text(json.dumps({'checks':checks,'javascript_errors':errors,'passed':len(checks)},ensure_ascii=False,indent=2),encoding='utf8')
print(f'{len(checks)} contrôles réussis. Captures et résultats dans {out}')
if static_server:static_server.shutdown()
