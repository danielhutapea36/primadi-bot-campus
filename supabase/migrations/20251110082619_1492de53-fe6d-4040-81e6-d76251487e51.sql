-- Create students profiles table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  nim TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  program_study TEXT NOT NULL,
  faculty TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  semester INT NOT NULL DEFAULT 1,
  academic_advisor TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create study cards table (kartu studi)
CREATE TABLE public.study_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  semester TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  card_number TEXT,
  total_credits INT DEFAULT 0,
  total_courses INT DEFAULT 0,
  gpa DECIMAL(3,2),
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  credits INT NOT NULL,
  semester INT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create study card courses (junction table)
CREATE TABLE public.study_card_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_card_id UUID REFERENCES public.study_cards(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  uts_score INT,
  attendance_score INT,
  assignment_score INT,
  uas_score INT,
  final_score DECIMAL(5,2),
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(study_card_id, course_id)
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create research proposals table
CREATE TABLE public.research_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  supervisor TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create library books table
CREATE TABLE public.library_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT,
  category TEXT,
  available INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create book reservations table
CREATE TABLE public.book_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES public.library_books(id) ON DELETE CASCADE NOT NULL,
  reservation_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  return_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_card_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students
CREATE POLICY "Users can view their own student profile"
  ON public.students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own student profile"
  ON public.students FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for study cards
CREATE POLICY "Users can view their own study cards"
  ON public.study_cards FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Users can create their own study cards"
  ON public.study_cards FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own study cards"
  ON public.study_cards FOR UPDATE
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- RLS Policies for courses (public read)
CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  USING (true);

-- RLS Policies for study card courses
CREATE POLICY "Users can view their own study card courses"
  ON public.study_card_courses FOR SELECT
  USING (study_card_id IN (
    SELECT id FROM public.study_cards 
    WHERE student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
  ));

CREATE POLICY "Users can manage their own study card courses"
  ON public.study_card_courses FOR ALL
  USING (study_card_id IN (
    SELECT id FROM public.study_cards 
    WHERE student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
  ));

-- RLS Policies for announcements (public read)
CREATE POLICY "Anyone can view announcements"
  ON public.announcements FOR SELECT
  USING (true);

-- RLS Policies for research proposals
CREATE POLICY "Users can view their own research proposals"
  ON public.research_proposals FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own research proposals"
  ON public.research_proposals FOR ALL
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- RLS Policies for library books (public read)
CREATE POLICY "Anyone can view library books"
  ON public.library_books FOR SELECT
  USING (true);

-- RLS Policies for book reservations
CREATE POLICY "Users can view their own book reservations"
  ON public.book_reservations FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own book reservations"
  ON public.book_reservations FOR ALL
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for students
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();