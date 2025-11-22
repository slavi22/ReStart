import { useAssessment } from "../../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function GoalsStep() {
  const { data, updateData, setStep, submitAssessment, isLoading } = useAssessment();

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>Career Goals</CardTitle>
        <CardDescription>Where do you want to go next?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="targetRole">Target Role</Label>
          <Input
            id="targetRole"
            placeholder="e.g. Senior Full Stack Developer"
            value={data.targetRole}
            onChange={(e) => updateData({ targetRole: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Availability for Learning</Label>
          <RadioGroup
            value={data.availability}
            onValueChange={(value) => updateData({ availability: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="5-10" id="r1" />
              <Label htmlFor="r1" className="cursor-pointer flex-1">5-10 hours/week</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="10-20" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer flex-1">10-20 hours/week</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="20+" id="r3" />
              <Label htmlFor="r3" className="cursor-pointer flex-1">20+ hours/week</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="full-time" id="r4" />
              <Label htmlFor="r4" className="cursor-pointer flex-1">Full-time</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setStep('experience')} disabled={isLoading}>
            Back
          </Button>
          <Button onClick={submitAssessment} disabled={!data.targetRole || !data.availability || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Profile...
              </>
            ) : (
              "Complete Assessment"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
