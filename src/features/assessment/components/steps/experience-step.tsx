import { useState } from "react";
import { useAssessment } from "../../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Pencil, CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ExperienceStep() {
  const { data, updateData, setCurrentStep } = useAssessment();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newExp, setNewExp] = useState({
    role: "",
    company: "",
    duration: "",
    description: ""
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { t } = useTranslation();

  const addExperience = () => {
    if (newExp.role && newExp.company && startDate && endDate) {
      const duration = `${format(startDate, "MMM yyyy")} - ${format(endDate, "MMM yyyy")}`;
      const experienceToAdd = { ...newExp, duration };

      if (editingIndex !== null) {
        const newExperience = [...data.experience];
        newExperience[editingIndex] = experienceToAdd;
        updateData({ experience: newExperience });
        setEditingIndex(null);
      } else {
        updateData({
          experience: [...data.experience, experienceToAdd]
        });
      }
      setNewExp({ role: "", company: "", duration: "", description: "" });
      setStartDate(undefined);
      setEndDate(undefined);
      setIsAdding(false);
    }
  };

  const editExperience = (index: number) => {
    const exp = data.experience[index];
    setNewExp(exp);
    
    const [start, end] = exp.duration.split(" - ");
    try {
      if (start) setStartDate(parse(start, "MMM yyyy", new Date()));
      if (end) setEndDate(parse(end, "MMM yyyy", new Date()));
    } catch (e) {
      console.error("Failed to parse date", e);
    }
    
    setEditingIndex(index);
    setIsAdding(true);
  };

  const removeExperience = (index: number) => {
    const newExperience = [...data.experience];
    newExperience.splice(index, 1);
    updateData({ experience: newExperience });
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingIndex(null);
    setNewExp({ role: "", company: "", duration: "", description: "" });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>{t('assessment.experience.title')}</CardTitle>
        <CardDescription>
          {t('assessment.experience.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg relative group">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => editExperience(index)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <h4 className="font-semibold">{exp.role}</h4>
              <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}

          {isAdding ? (
            <div className="p-4 border rounded-lg bg-muted/30 space-y-4 animate-in fade-in zoom-in-95">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">{t('assessment.experience.role')}</Label>
                  <Input
                    id="role"
                    value={newExp.role}
                    onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                    placeholder={t('assessment.experience.rolePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t('assessment.experience.company')}</Label>
                  <Input
                    id="company"
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    placeholder={t('assessment.experience.companyPlaceholder')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 flex flex-col">
                  <Label>{t('assessment.experience.startDate') || "Start Date"}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        {startDate ? (
                          format(startDate, "MMM yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label>{t('assessment.experience.endDate') || "End Date"}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        {endDate ? (
                          format(endDate, "MMM yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t('assessment.experience.desc')}</Label>
                <Textarea
                  id="description"
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  placeholder={t('assessment.experience.descPlaceholder')}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={cancelEdit}>{t('assessment.experience.cancel')}</Button>
                <Button onClick={addExperience} disabled={!newExp.role || !newExp.company || !startDate || !endDate}>{t('assessment.experience.save')}</Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> {t('assessment.experience.add')}
            </Button>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setCurrentStep('skills')}>
            {t('assessment.experience.back')}
          </Button>
          <Button onClick={() => setCurrentStep('goals')}>
            {t('assessment.experience.next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
