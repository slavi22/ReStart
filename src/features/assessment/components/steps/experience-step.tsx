import { useState } from "react";
import { useAssessment } from "../../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

export function ExperienceStep() {
  const { data, updateData, setStep } = useAssessment();
  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState({
    role: "",
    company: "",
    duration: "",
    description: ""
  });

  const addExperience = () => {
    if (newExp.role && newExp.company) {
      updateData({
        experience: [...data.experience, newExp]
      });
      setNewExp({ role: "", company: "", duration: "", description: "" });
      setIsAdding(false);
    }
  };

  const removeExperience = (index: number) => {
    const newExperience = [...data.experience];
    newExperience.splice(index, 1);
    updateData({ experience: newExperience });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Tell us about your professional background.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <h4 className="font-semibold">{exp.role}</h4>
              <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}

          {isAdding ? (
            <div className="p-4 border rounded-lg bg-muted/30 space-y-4 animate-in fade-in zoom-in-95">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role Title</Label>
                  <Input
                    id="role"
                    value={newExp.role}
                    onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                    placeholder="e.g. Senior Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    placeholder="e.g. Tech Corp"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newExp.duration}
                  onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                  placeholder="e.g. 2020 - Present"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  placeholder="Briefly describe your responsibilities..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button onClick={addExperience} disabled={!newExp.role || !newExp.company}>Add</Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setStep('skills')}>
            Back
          </Button>
          <Button onClick={() => setStep('goals')}>
            Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
