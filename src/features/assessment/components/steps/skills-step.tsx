import { useState } from "react";
import { useAssessment } from "../../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export function SkillsStep() {
  const { data, updateData, setStep } = useAssessment();
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState([3]);

  const addSkill = () => {
    if (newSkill.trim()) {
      updateData({
        skills: [...data.skills, { name: newSkill.trim(), level: newSkillLevel[0] }]
      });
      setNewSkill("");
      setNewSkillLevel([3]);
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1);
    updateData({ skills: newSkills });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
        <CardDescription>List your current technical skills and proficiency levels (1-5).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Add a Skill</Label>
              <div className="flex gap-2">
                <Input
                  id="skillName"
                  placeholder="e.g. React, Python, Project Management"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Proficiency Level: {newSkillLevel[0]}/5</Label>
                <span className="text-xs text-muted-foreground">
                  {newSkillLevel[0] === 1 && "Beginner"}
                  {newSkillLevel[0] === 2 && "Elementary"}
                  {newSkillLevel[0] === 3 && "Intermediate"}
                  {newSkillLevel[0] === 4 && "Advanced"}
                  {newSkillLevel[0] === 5 && "Expert"}
                </span>
              </div>
              <Slider
                value={newSkillLevel}
                onValueChange={setNewSkillLevel}
                min={1}
                max={5}
                step={1}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Your Skills</Label>
          {data.skills.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No skills added yet.</p>
          )}
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex gap-2 items-center">
                <span>{skill.name}</span>
                <span className="bg-primary/10 text-primary px-1.5 rounded text-[10px]">Lvl {skill.level}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setStep('basic-info')}>
            Back
          </Button>
          <Button onClick={() => setStep('experience')} disabled={data.skills.length === 0}>
            Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
