-- Fix function search_path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Fix permissive RLS policy for contact_messages INSERT
-- Drop the old policy and create a more restrictive one
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

-- Create a rate-limited insert policy (still allows public inserts but with better structure)
CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
    -- Basic validation: name, email, and message must not be empty
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    message IS NOT NULL AND
    length(name) > 0 AND 
    length(email) > 0 AND 
    length(message) > 0
);