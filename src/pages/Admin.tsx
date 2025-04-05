
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus } from "lucide-react";
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
import { Question, Stage } from "@/data/questions/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import categories from "@/data/categories";
import { STAGES } from "@/pages/Index";

const QuestionSchema = z.object({
  question: z.string().min(3, { message: "يجب أن يكون السؤال أكثر من 3 أحرف" }),
  option1: z.string().min(1, { message: "يجب إدخال الخيار الأول" }),
  option2: z.string().min(1, { message: "يجب إدخال الخيار الثاني" }),
  option3: z.string().min(1, { message: "يجب إدخال الخيار الثالث" }),
  option4: z.string().min(1, { message: "يجب إدخال الخيار الرابع" }),
  correctAnswer: z.string().min(1, { message: "يجب تحديد الإجابة الصحيحة" }),
  category: z.string().min(1, { message: "يجب اختيار التصنيف" }),
  level: z.string().min(1, { message: "يجب اختيار المستوى" }),
  stageId: z.string().optional(),
  explanation: z.string().optional(),
});

const QuestionUploadSchema = z.object({
  questionsJson: z.string()
    .min(1, { message: "يجب إدخال الأسئلة" })
});

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("single");
  const [availableStages, setAvailableStages] = useState<Stage[]>([]);
  
  const singleQuestionForm = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "1",
      category: "football",
      level: "beginner",
      stageId: "",
      explanation: "",
    }
  });
  
  const jsonUploadForm = useForm<z.infer<typeof QuestionUploadSchema>>({
    resolver: zodResolver(QuestionUploadSchema),
    defaultValues: {
      questionsJson: ""
    }
  });

  const selectedCategory = singleQuestionForm.watch("category");
  const selectedLevel = singleQuestionForm.watch("level");
  
  useEffect(() => {
    if (selectedCategory && selectedLevel && STAGES[selectedCategory]) {
      const filteredStages = STAGES[selectedCategory].filter(
        stage => stage.id.startsWith(selectedLevel)
      );
      setAvailableStages(filteredStages);
      singleQuestionForm.setValue("stageId", "");
    } else {
      setAvailableStages([]);
    }
  }, [selectedCategory, selectedLevel, singleQuestionForm]);
  
  const handleAddQuestion = async (values: z.infer<typeof QuestionSchema>) => {
    try {
      const newQuestion: Question = {
        id: Date.now(),
        question: values.question,
        options: [values.option1, values.option2, values.option3, values.option4],
        correctAnswer: parseInt(values.correctAnswer) - 1,
        category: values.category,
        level: values.level,
        stageId: values.stageId || undefined,
        explanation: values.explanation || undefined,
      };
      
      const existingQuestions = localStorage.getItem('uploadedQuestions');
      const allQuestions = existingQuestions 
        ? [...JSON.parse(existingQuestions), newQuestion]
        : [newQuestion];
      
      localStorage.setItem('uploadedQuestions', JSON.stringify(allQuestions));
      
      toast({
        title: "تم إضافة السؤال بنجاح",
        description: "تم إضافة السؤال الجديد إلى قاعدة البيانات",
      });
      
      singleQuestionForm.reset();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: error instanceof Error ? error.message : "خطأ في إضافة السؤال",
        variant: "destructive",
      });
    }
  };
  
  const handleUploadQuestions = async (values: z.infer<typeof QuestionUploadSchema>) => {
    setIsUploading(true);
    
    try {
      const questions = JSON.parse(values.questionsJson) as Question[];
      
      if (!Array.isArray(questions)) {
        throw new Error("يجب أن تكون الأسئلة على شكل مصفوفة");
      }
      
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
      
      const existingQuestions = localStorage.getItem('uploadedQuestions');
      const allQuestions = existingQuestions 
        ? [...JSON.parse(existingQuestions), ...questions]
        : questions;
      
      localStorage.setItem('uploadedQuestions', JSON.stringify(allQuestions));
      
      toast({
        title: "تم رفع الأسئلة بنجاح",
        description: `تم إضافة ${questions.length} سؤال جديد`,
      });
      
      jsonUploadForm.reset();
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="single" className="text-base">إضافة سؤال فردي</TabsTrigger>
            <TabsTrigger value="json" className="text-base">رفع أسئلة (JSON)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-0">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">إضافة سؤال جديد</h2>
              
              <Form {...singleQuestionForm}>
                <form onSubmit={singleQuestionForm.handleSubmit(handleAddQuestion)} className="space-y-6">
                  <FormField
                    control={singleQuestionForm.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">السؤال</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="أدخل نص السؤال هنا"
                            className="min-h-[80px]"
                            dir="rtl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={singleQuestionForm.control}
                      name="option1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الخيار 1</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="الخيار الأول" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={singleQuestionForm.control}
                      name="option2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الخيار 2</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="الخيار الثاني" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={singleQuestionForm.control}
                      name="option3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الخيار 3</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="الخيار الثالث" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={singleQuestionForm.control}
                      name="option4"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الخيار 4</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="الخيار الرابع" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={singleQuestionForm.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الإجابة الصحيحة</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الإجابة الصحيحة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">الخيار 1</SelectItem>
                            <SelectItem value="2">الخيار 2</SelectItem>
                            <SelectItem value="3">الخيار 3</SelectItem>
                            <SelectItem value="4">الخيار 4</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={singleQuestionForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>التصنيف</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر التصنيف" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={singleQuestionForm.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المستوى</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المستوى" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">مبتدئ</SelectItem>
                              <SelectItem value="intermediate">متوسط</SelectItem>
                              <SelectItem value="advanced">متقدم</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={singleQuestionForm.control}
                      name="stageId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المرحلة</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || "none"}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المرحلة (اختياري)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">بدون تعيين مرحلة</SelectItem>
                              {availableStages.map(stage => (
                                <SelectItem key={stage.id} value={stage.id}>
                                  {stage.title} (مرحلة {stage.order})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={singleQuestionForm.control}
                    name="explanation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شرح الإجابة (اختياري)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="شرح إضافي للإجابة الصحيحة (اختياري)"
                            className="min-h-[80px]"
                            dir="rtl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-2">
                      إضافة السؤال
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
          
          <TabsContent value="json" className="mt-0">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">رفع أسئلة متعددة</h2>
              
              <Form {...jsonUploadForm}>
                <form onSubmit={jsonUploadForm.handleSubmit(handleUploadQuestions)} className="space-y-6">
                  <FormField
                    control={jsonUploadForm.control}
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
                    <Button type="submit" disabled={isUploading} className="flex items-center gap-2">
                      {isUploading ? "جاري الرفع..." : "رفع الأسئلة"}
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Separator className="my-6" />
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">
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
    "stageId": "intermediate-3",
    "explanation": "كيليان مبابي كان هداف كأس العالم 2022 برصيد 8 أهداف"
  }
]`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
