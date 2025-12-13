-- Create storage bucket for social media files
INSERT INTO storage.buckets (id, name, public) VALUES ('social-media', 'social-media', true);

-- Storage policies for public read access
CREATE POLICY "Anyone can view social media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'social-media');

-- Storage policies for admin upload
CREATE POLICY "Admins can upload social media files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'social-media' AND has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for admin update
CREATE POLICY "Admins can update social media files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'social-media' AND has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for admin delete
CREATE POLICY "Admins can delete social media files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'social-media' AND has_role(auth.uid(), 'admin'::app_role));

-- Add new columns to social_posts table
ALTER TABLE public.social_posts 
ADD COLUMN media_type TEXT NOT NULL DEFAULT 'image',
ADD COLUMN media_urls JSONB DEFAULT '[]'::jsonb,
ADD COLUMN video_url TEXT,
ADD COLUMN thumbnail_url TEXT;

-- Update existing posts to use media_urls array with the current image_url
UPDATE public.social_posts 
SET media_urls = jsonb_build_array(image_url)
WHERE media_type = 'image' AND image_url IS NOT NULL;