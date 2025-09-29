-- Create tables for chat history and timeline reminders

-- Chat history table
CREATE TABLE public.chat_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  is_user_message BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on chat_history
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Create policies for chat_history
CREATE POLICY "Users can view their own chat history" 
ON public.chat_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" 
ON public.chat_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Timeline reminders table
CREATE TABLE public.timeline_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  reminder_date DATE NOT NULL,
  reminder_time TIME,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on timeline_reminders
ALTER TABLE public.timeline_reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for timeline_reminders
CREATE POLICY "Users can view their own reminders" 
ON public.timeline_reminders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" 
ON public.timeline_reminders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
ON public.timeline_reminders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.timeline_reminders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updating updated_at on timeline_reminders
CREATE TRIGGER update_timeline_reminders_updated_at
BEFORE UPDATE ON public.timeline_reminders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add date_of_birth and contact fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN date_of_birth DATE,
ADD COLUMN contact_number TEXT,
ADD COLUMN hobbies TEXT[];