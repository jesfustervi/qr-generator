import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  title?: string;
}

export function ColorPicker({ color, onChange, className, title }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className={`w-12 h-10 p-1 cursor-pointer ${className}`}
        title={title || "Seleccionar color"}
      />
    </div>
  );
} 