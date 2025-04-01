
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "@/data/questions/types";

// Create a schema for question validation
const QuestionUploadSchema = z.object({
  questionsJson: z.string()
    .min(1, { message: "يجب إدخال الأسئلة" })
});

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  
  // Create form
  const form = useForm<z.infer<typeof QuestionUploadSchema>>({
    resolver: zodResolver(QuestionUploadSchema),
    defaultValues: {
      questionsJson: ""
    }
  });
  
  const handleUploadQuestions = async (values: z.infer<typeof QuestionUploadSchema>) => {
    setIsUploading(true);
    
    try {
      // Parse JSON
      const questions = JSON.parse(values.questionsJson) as Question[];
      
      if (!Array.isArray(questions)) {
        throw new Error("يجب أن تكون الأسئلة على شكل مصفوفة");
      }
      
      // Validate each question has the required fields
      const requiredFields = ["id", "question", "options", "correctAnswer", "category", "level"];
      
      for (const question of questions) {
        for (const field of requiredFields) {
          if (!(field in question)) {
            throw new Error(`السؤال يفتقد حقل ${field}`);
          }
        }
        
        if (!Array.isArray(question.options) || question.options.length < 2) {
          throw new Error("يجب أن يحتوي كل سؤال على خيارين على الأقل");
        }
      }
      
      // Save questions to localStorage for persistence
      const existingQuestions = localStorage.getItem('uploadedQuestions');
      const allQuestions = existingQuestions 
        ? [...JSON.parse(existingQuestions), ...questions]
        : questions;
      
      localStorage.setItem('uploadedQuestions', JSON.stringify(allQuestions));
      
      toast({
        title: "تم رفع الأسئلة بنجاح",
        description: `تم إضافة ${questions.length} سؤال جديد`,
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: error instanceof Error ? error.message : "خطأ في تنسيق الأسئلة",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pb-10 transition-colors duration-300">
      <div className="container mx-auto pt-8 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">لوحة الإدارة</h1>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">رفع أسئلة جديدة</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUploadQuestions)} className="space-y-6">
              <FormField
                control={form.control}
                name="questionsJson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملف الأسئلة (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="أدخل الأسئلة بتنسيق JSON"
                        className="min-h-[300px] font-mono text-sm"
                        dir="ltr"
                      />
                    </FormControl>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      أدخل الأسئلة بتنسيق JSON. يجب أن تكون مصفوفة من كائنات الأسئلة.
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isUploading} className="flex items-center">
                  {isUploading ? "جاري الرفع..." : "رفع الأسئلة"}
                  <Upload className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-8 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold mb-2">مثال على تنسيق السؤال:</h3>
            <pre className="text-xs overflow-auto p-2 bg-gray-100 dark:bg-gray-800 rounded" dir="ltr">
{`[
  {
    "id": 1001,
    "question": "من هو هداف كأس العالم 2022؟",
    "options": ["ليونيل ميسي", "كيليان مبابي", "كريستيانو رونالدو", "نيمار"],
    "correctAnswer": 1,
    "category": "football",
    "level": "intermediate",
    "explanation": "كيليان مبابي كان هداف كأس العالم 2022 برصيد 8 أهداف"
  }
]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
