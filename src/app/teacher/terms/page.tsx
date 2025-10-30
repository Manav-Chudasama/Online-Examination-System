"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TeacherTermsPage() {
  const [bullets, setBullets] = useState<string[]>([""]);
  const max = 10;
  const update = (i: number, v: string) => {
    setBullets((bullets) => {
      let copy = [...bullets];
      copy[i] = v;
      return copy;
    });
  };
  const add = () => setBullets((b) => (b.length < max ? [...b, ""] : b));
  const remove = (i: number) =>
    setBullets((bullets) => bullets.filter((_, idx) => idx !== i));
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight text-green-700 mb-4">
        Edit Terms & Conditions
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          {bullets.length} / {max} bullets
        </div>
        <ul className="flex flex-col gap-3 mt-2">
          {bullets.map((b, i) => (
            <li className="flex gap-2 items-center" key={i}>
              <span className="font-bold">{i + 1}.</span>
              <input
                className="flex-1 px-4 py-2 rounded bg-input border border-border text-base focus:ring-2 focus:ring-green-200"
                maxLength={120}
                value={b}
                onChange={(e) => update(i, e.target.value)}
                placeholder="Type rule here..."
              />
              {bullets.length > 1 && (
                <Button
                  size="icon-sm"
                  variant="destructive"
                  type="button"
                  onClick={() => remove(i)}
                >
                  ×
                </Button>
              )}
            </li>
          ))}
        </ul>
        <Button
          size="sm"
          className="mt-2"
          type="button"
          onClick={add}
          disabled={bullets.length >= max}
        >
          Add Bullet
        </Button>
      </div>
      <div className="flex justify-end">
        <Button>Save Terms</Button>
      </div>
    </div>
  );
}
