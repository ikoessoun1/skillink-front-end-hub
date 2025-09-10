import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SkillSelectorProps {
  availableSkills: string[];
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  maxSkills?: number;
}

export function SkillSelector({
  availableSkills,
  selectedSkills,
  onSkillToggle,
  maxSkills,
}: SkillSelectorProps) {
  const handleSkillClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillToggle(skill);
    } else if (!maxSkills || selectedSkills.length < maxSkills) {
      onSkillToggle(skill);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {availableSkills.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          const isDisabled = !isSelected && maxSkills && selectedSkills.length >= maxSkills;
          
          return (
            <Badge
              key={skill}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:scale-105",
                isSelected && "bg-primary text-primary-foreground shadow-md",
                !isSelected && !isDisabled && "hover:bg-muted",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !isDisabled && handleSkillClick(skill)}
            >
              {skill}
              {isSelected && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </Badge>
          );
        })}
      </div>
      {maxSkills && (
        <p className="text-xs text-muted-foreground">
          {selectedSkills.length} of {maxSkills} skills selected
        </p>
      )}
    </div>
  );
}