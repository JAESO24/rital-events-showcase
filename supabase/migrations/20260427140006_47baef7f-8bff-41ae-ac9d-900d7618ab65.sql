ALTER TABLE public.contacts
  ADD CONSTRAINT contacts_name_length CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contacts_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contacts_phone_length CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT contacts_message_length CHECK (char_length(message) BETWEEN 1 AND 5000);
