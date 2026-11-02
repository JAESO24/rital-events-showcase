from pathlib import Path
import json,hashlib
from playwright.sync_api import sync_playwright,expect
r=Path(r'C:\Users\USER\Desktop\rital-events-showcase');out=r/'verification/premium';out.mkdir(exist_ok=True)
data=json.loads((r/'src/data/premium.json').read_text(encoding='utf8'));checks=[];errors=[];sent=[]
def check(v,label):
 if not v:raise AssertionError(label)
 checks.append(label)
def shot(page,name):
 for y in range(0,page.evaluate('document.documentElement.scrollHeight'),800):
  page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(90)
 page.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)',timeout=30000)
 page.evaluate('scrollTo(0,0)');page.wait_for_timeout(500);page.screenshot(path=str(out/name),full_page=True)
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True);context=browser.new_context(viewport={'width':1440,'height':1000})
 page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
 for path in ['/','/services','/catalogue','/realisations','/a-propos','/contact']:
  page.goto('http://localhost:5177'+path,wait_until='networkidle',timeout=60000);page.locator('h1').wait_for()
  check(page.evaluate('document.documentElement.scrollWidth<=innerWidth'),'Pas de débordement ordinateur '+path)
  if path=='/':
   check(page.locator('.catalogue-download a[download]').count()==1,'Téléchargement sur l’accueil');shot(page,'accueil-ordinateur.png')
 page.goto('http://localhost:5177/catalogue',wait_until='networkidle');expect(page.locator('.product-card')).to_have_count(64,timeout=30000)
 for c in data:
  card=page.locator(f'[data-reference="{c["reference"]}"]')
  check(card.locator('h3').inner_text()==c['title'],'Nom exact '+c['reference'])
  check(card.locator('.product-photo img').get_attribute('src')==f'/premium/{c["reference"]}-thumb.webp','Image exacte '+c['reference'])
  check(card.locator('.source-link').get_attribute('href').endswith('#page='+str(c['page'])),'Bonne page PDF '+c['reference'])
 for family in dict.fromkeys(c['category'] for c in data):
  page.get_by_role('button',name=family,exact=True).click();expect(page.locator('.product-card')).to_have_count(sum(c['category']==family for c in data))
  check(True,'Filtre de famille '+family)
 page.get_by_role('button',name='Tout',exact=True).click()
 page.get_by_role('textbox',name='Rechercher un article').fill('RE-038');expect(page.locator('.product-card')).to_have_count(1)
 check('Couverts dorés' in page.locator('.product-card').inner_text(),'Recherche par référence exacte')
 page.get_by_role('textbox',name='Rechercher un article').fill('')
 def qty(ref,n):page.locator(f'[data-reference="{ref}"] input[type=number]').fill(str(n))
 qty('RE-011',10);qty('RE-027',2)
 check('14' in page.locator('.basket-total strong').inner_text(),'10 chaises dorées + 2 tables importées = 14 000 F CFA')
 qty('RE-019',1)
 check('14' in page.locator('.basket-total strong').inner_text() and 'sur devis' in page.locator('.basket-total').inner_text(),'Article non tarifé exclu du sous-total, annoncé sur devis')
 page.locator('[data-reference="RE-002"] select').select_option(index=1);qty('RE-002',1)
 check('94' in page.locator('.basket-total strong').inner_text(),'Variante Garden avec plancher 80 000 F CFA')
 qty('RE-001',2);qty('RE-057',3)
 check('120' in page.locator('.basket-total strong').inner_text(),'Calcul avec unités m² et m : 120 000 F CFA')
 page.reload(wait_until='networkidle');expect(page.locator('[data-reference="RE-011"] input[type=number]')).to_have_value('10')
 check(True,'Sélection Premium conservée')
 page.locator('[data-reference="RE-038"] .product-photo').click();check(page.locator('dialog').evaluate('(d)=>d.open'),'Agrandissement du modèle exact')
 check(page.locator('dialog img').get_attribute('src')=='/premium/RE-038.webp','Couverts dorés affichés dans le zoom')
 page.keyboard.press('Escape');check(not page.locator('dialog').evaluate('(d)=>d.open'),'Fermeture native par Échap')
 shot(page,'catalogue-ordinateur.png')
 pdf=page.request.get('http://localhost:5177/Catalogue-Rital-Events-Premium-2026.pdf')
 check(pdf.status==200 and hashlib.sha256(pdf.body()).hexdigest()==hashlib.sha256(Path(r'C:\Users\USER\Downloads\Catalogue_Rital_Events_Premium_2026 (1).pdf').read_bytes()).hexdigest(),'PDF téléchargé strictement identique au document fourni')
 for c in data:
  for suffix in ['', '-thumb']:
   response=page.request.get(f'http://localhost:5177/premium/{c["reference"]}{suffix}.webp')
   check(response.status==200,'Visuel disponible '+c['reference']+suffix)
 # Interception de toutes les écritures : aucune demande réelle vers Supabase ou un SMTP.
 def fake(route):
  sent.append(route.request.post_data_json);route.fulfill(status=200,json={'status':'sent','emailSent':True,'saved':True,'message':'Votre demande a été transmise à Rital Events. Nous reviendrons vers vous.'})
 page.route('**/api/contact',fake)
 page.goto('http://localhost:5177/contact',wait_until='networkidle')
 page.locator('input[name=name]').fill('Client test local');page.locator('input[name=phone]').fill('+2250700000000');page.locator('input[name=email]').fill('client@example.test');page.locator('select[name=event]').select_option(label='Mariage');page.locator('input[name=place]').fill('Abidjan — test local')
 page.get_by_role('button',name='Relire et partager le message').click()
 check(not sent,'Relire ne transmet aucune demande')
 message=page.locator('#prepared-message pre').inner_text()
 check('RE-019' in message and 'Sur devis' in message and '120' in message,'Demande détaillée, unités et articles sur devis')
 page.get_by_role('button',name='Envoyer ma demande',exact=True).click();expect(page.locator('.form-feedback.success')).to_be_visible()
 check(len(sent)==1 and sent[0]['email']=='client@example.test','Un seul envoi au service de contact, e-mail requis')
 check(page.get_by_role('button',name='Demande prise en compte').is_disabled(),'Double clic protégé')
 shot(page,'contact-ordinateur.png')
 page.goto('http://localhost:5177/realisations',wait_until='networkidle');expect(page.locator('.gallery-item')).to_have_count(64)
 check(page.locator('.gallery-item').nth(37).locator('img').get_attribute('src')=='/premium/RE-038-thumb.webp','Galerie et catalogue utilisent le même modèle')
 page.locator('.gallery-item').nth(37).click();check('Couverts dorés' in page.locator('.lightbox figcaption').inner_text(),'Légende du bon visuel dans la galerie');page.keyboard.press('Escape')
 page.set_viewport_size({'width':390,'height':844})
 for path in ['/','/catalogue','/realisations','/contact','/services']:
  page.goto('http://localhost:5177'+path,wait_until='networkidle');page.locator('h1').wait_for()
  check(page.evaluate('document.documentElement.scrollWidth<=innerWidth'),'Pas de débordement mobile '+path)
  if path=='/catalogue':shot(page,'catalogue-mobile.png')
  if path=='/':
   shot(page,'accueil-mobile.png');page.get_by_role('button',name='Ouvrir le menu').click();page.locator('.mobile-nav').get_by_role('link',name='Catalogue',exact=True).click();expect(page.locator('.product-card')).to_have_count(64)
 # Animations désactivées pour les personnes qui le demandent.
 page.emulate_media(reduced_motion='reduce');page.goto('http://localhost:5177/',wait_until='networkidle')
 check(page.evaluate('getComputedStyle(document.querySelector(".button")).transitionDuration')=='0s','Réduction des animations respectée')
 check(not errors,'Aucune erreur JavaScript : '+str(errors));browser.close()
(out/'resultats.json').write_text(json.dumps({'passed':len(checks),'checks':checks,'javascript_errors':errors,'outbound_test_messages':0},ensure_ascii=False,indent=2),encoding='utf8')
print(str(len(checks))+' contrôles réussis, aucun message réel envoyé.')
