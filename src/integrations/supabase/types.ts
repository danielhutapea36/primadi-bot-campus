export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          priority: string | null
          published_at: string | null
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          priority?: string | null
          published_at?: string | null
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          priority?: string | null
          published_at?: string | null
          title?: string
        }
        Relationships: []
      }
      book_reservations: {
        Row: {
          book_id: string
          created_at: string | null
          id: string
          reservation_date: string | null
          return_date: string | null
          status: string | null
          student_id: string
        }
        Insert: {
          book_id: string
          created_at?: string | null
          id?: string
          reservation_date?: string | null
          return_date?: string | null
          status?: string | null
          student_id: string
        }
        Update: {
          book_id?: string
          created_at?: string | null
          id?: string
          reservation_date?: string | null
          return_date?: string | null
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_reservations_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "library_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reservations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          created_at: string | null
          credits: number
          description: string | null
          id: string
          name: string
          semester: number
        }
        Insert: {
          code: string
          created_at?: string | null
          credits: number
          description?: string | null
          id?: string
          name: string
          semester: number
        }
        Update: {
          code?: string
          created_at?: string | null
          credits?: number
          description?: string | null
          id?: string
          name?: string
          semester?: number
        }
        Relationships: []
      }
      library_books: {
        Row: {
          author: string
          available: number | null
          category: string | null
          created_at: string | null
          id: string
          isbn: string | null
          title: string
        }
        Insert: {
          author: string
          available?: number | null
          category?: string | null
          created_at?: string | null
          id?: string
          isbn?: string | null
          title: string
        }
        Update: {
          author?: string
          available?: number | null
          category?: string | null
          created_at?: string | null
          id?: string
          isbn?: string | null
          title?: string
        }
        Relationships: []
      }
      research_proposals: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          student_id: string
          submitted_at: string | null
          supervisor: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          student_id: string
          submitted_at?: string | null
          supervisor?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          student_id?: string
          submitted_at?: string | null
          supervisor?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_proposals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          academic_advisor: string | null
          academic_year: string
          created_at: string | null
          faculty: string
          id: string
          name: string
          nim: string
          photo_url: string | null
          program_study: string
          semester: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          academic_advisor?: string | null
          academic_year: string
          created_at?: string | null
          faculty: string
          id?: string
          name: string
          nim: string
          photo_url?: string | null
          program_study: string
          semester?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          academic_advisor?: string | null
          academic_year?: string
          created_at?: string | null
          faculty?: string
          id?: string
          name?: string
          nim?: string
          photo_url?: string | null
          program_study?: string
          semester?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      study_card_courses: {
        Row: {
          assignment_score: number | null
          attendance_score: number | null
          course_id: string
          created_at: string | null
          final_score: number | null
          grade: string | null
          id: string
          study_card_id: string
          uas_score: number | null
          uts_score: number | null
        }
        Insert: {
          assignment_score?: number | null
          attendance_score?: number | null
          course_id: string
          created_at?: string | null
          final_score?: number | null
          grade?: string | null
          id?: string
          study_card_id: string
          uas_score?: number | null
          uts_score?: number | null
        }
        Update: {
          assignment_score?: number | null
          attendance_score?: number | null
          course_id?: string
          created_at?: string | null
          final_score?: number | null
          grade?: string | null
          id?: string
          study_card_id?: string
          uas_score?: number | null
          uts_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "study_card_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_card_courses_study_card_id_fkey"
            columns: ["study_card_id"]
            isOneToOne: false
            referencedRelation: "study_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      study_cards: {
        Row: {
          academic_year: string
          card_number: string | null
          created_at: string | null
          gpa: number | null
          id: string
          last_modified: string | null
          semester: string
          status: string
          student_id: string
          total_courses: number | null
          total_credits: number | null
        }
        Insert: {
          academic_year: string
          card_number?: string | null
          created_at?: string | null
          gpa?: number | null
          id?: string
          last_modified?: string | null
          semester: string
          status?: string
          student_id: string
          total_courses?: number | null
          total_credits?: number | null
        }
        Update: {
          academic_year?: string
          card_number?: string | null
          created_at?: string | null
          gpa?: number | null
          id?: string
          last_modified?: string | null
          semester?: string
          status?: string
          student_id?: string
          total_courses?: number | null
          total_credits?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "study_cards_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
