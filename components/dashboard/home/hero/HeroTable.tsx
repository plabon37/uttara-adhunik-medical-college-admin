"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import HeroLoading from "./HeroLoading";
import HeroEmpty from "./HeroEmpty";
import HeroTableRow from "./HeroTableRow";

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

export default function HeroTable() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getHeroes = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/hero", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setHeroes(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load hero.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  async function loadHeroes() {
    try {
      setLoading(true);

      const res = await fetch("/api/hero", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setHeroes(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load hero.");
    } finally {
      setLoading(false);
    }
  }

  loadHeroes();
}, []);

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) =>
      hero.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [heroes, search]);

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Hero?"
      );

      if (!confirmDelete) return;

      const res = await fetch(`/api/hero/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      getHeroes();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  };

  if (loading) {
    return <HeroLoading />;
  }

  if (filteredHeroes.length === 0) {
    return <HeroEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Search */}

      <div className="border-b border-slate-200 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Hero..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-teal-500
            "
          />
        </div>
      </div>
            {/* Desktop Table */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Image
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Slide
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredHeroes.map((hero) => (
              <HeroTableRow
                key={hero._id}
                hero={hero}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}

      <div className="space-y-5 p-5 lg:hidden">
        {filteredHeroes.map((hero) => (
          <div
            key={hero._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={hero.backgroundImage}
              alt={hero.title}
              className="h-48 w-full object-cover"
            />

            <div className="space-y-4 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {hero.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {hero.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium">
                  Slide #{hero.slideNumber}
                </span>

                {hero.isActive ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Inactive
                  </span>
                )}
              </div>

              <div className="text-sm text-slate-500">
                Created :
                {" "}
                {new Date(
                  hero.createdAt
                ).toLocaleDateString()}
              </div>

              <div className="flex gap-3">
                <a
                  href={`/dashboard/home/hero/edit/${hero._id}`}
                  className="
                    flex-1
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Edit
                </a>

                <button
                  onClick={() =>
                    handleDelete(hero._id)
                  }
                  className="
                    flex-1
                    rounded-xl
                    bg-red-600
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}