"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface Hero {
  _id: string;
  tagline: string;
  title: string;
  highlightText: string;
  lastTitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  rightTitle: string;
  courseOneTitle: string;
  courseOneDescription: string;
  courseTwoTitle: string;
  courseTwoDescription: string;
  slideNumber: number;
  isActive: boolean;
  createdAt: string;
}

interface HeroTableRowProps {
  hero: Hero;
  onDelete: (id: string) => void;
}

export default function HeroTableRow({
  hero,
  onDelete,
}: HeroTableRowProps) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">
      {/* Image */}

      <td className="px-6 py-4">
        <div className="relative h-16 w-28 overflow-hidden rounded-xl border border-slate-200">
          <Image
            src={hero.backgroundImage}
            alt={hero.title}
            fill
            className="object-cover"
          />
        </div>
      </td>

      {/* Title */}

      <td className="px-6 py-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            {hero.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
            {hero.tagline}
          </p>
        </div>
      </td>

      {/* Slide */}

      <td className="px-6 py-4">
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          #{hero.slideNumber}
        </span>
      </td>

      {/* Status */}

      <td className="px-6 py-4">
        {hero.isActive ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Active
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Inactive
          </span>
        )}
      </td>

      {/* Created */}

      <td className="px-6 py-4 text-sm text-slate-500">
        {new Date(hero.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <Link
            href={`/dashboard/home/hero/edit/${hero._id}`}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
              transition
              hover:bg-blue-100
            "
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={() => onDelete(hero._id)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}