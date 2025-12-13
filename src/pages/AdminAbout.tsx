import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react";
import {
  useSkills,
  useCreateSkill,
  useDeleteSkill,
  useLanguages,
  useCreateLanguage,
  useDeleteLanguage,
  useExperiences,
  useCreateExperience,
  useDeleteExperience,
} from "@/hooks/useAboutData";

const AdminAbout = () => {
  const navigate = useNavigate();

  // Skills state
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const createSkill = useCreateSkill();
  const deleteSkill = useDeleteSkill();
  const [newSkill, setNewSkill] = useState({ name: "", category: "general" });

  // Languages state
  const { data: languages, isLoading: languagesLoading } = useLanguages();
  const createLanguage = useCreateLanguage();
  const deleteLanguage = useDeleteLanguage();
  const [newLanguage, setNewLanguage] = useState({ language: "", level: "" });

  // Experiences state
  const { data: experiences, isLoading: experiencesLoading } = useExperiences();
  const createExperience = useCreateExperience();
  const deleteExperience = useDeleteExperience();
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    period: "",
    descriptionText: "",
  });

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    createSkill.mutate({
      name: newSkill.name.trim(),
      category: newSkill.category,
      display_order: (skills?.length || 0) + 1,
    });
    setNewSkill({ name: "", category: "general" });
  };

  const handleAddLanguage = () => {
    if (!newLanguage.language.trim() || !newLanguage.level.trim()) return;
    createLanguage.mutate({
      language: newLanguage.language.trim(),
      level: newLanguage.level.trim(),
      display_order: (languages?.length || 0) + 1,
    });
    setNewLanguage({ language: "", level: "" });
  };

  const handleAddExperience = () => {
    if (!newExperience.company.trim() || !newExperience.role.trim()) return;
    createExperience.mutate({
      company: newExperience.company.trim(),
      role: newExperience.role.trim(),
      period: newExperience.period.trim(),
      description: newExperience.descriptionText
        .split("\n")
        .filter((line) => line.trim()),
      display_order: (experiences?.length || 0) + 1,
    });
    setNewExperience({ company: "", role: "", period: "", descriptionText: "" });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <h1 className="text-3xl font-semibold mb-8">Gestionar Sobre Mí</h1>

        {/* Skills Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Herramientas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Nombre de herramienta"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
              <Input
                placeholder="Categoría"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-40"
              />
              <Button onClick={handleAddSkill} disabled={createSkill.isPending}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {skillsLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 px-3 py-1.5 border border-divider rounded-full text-sm"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => deleteSkill.mutate(skill.id)}
                      className="text-subtle hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Languages Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Idiomas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Idioma"
                value={newLanguage.language}
                onChange={(e) =>
                  setNewLanguage({ ...newLanguage, language: e.target.value })
                }
              />
              <Input
                placeholder="Nivel (ej: C1, Nativo)"
                value={newLanguage.level}
                onChange={(e) =>
                  setNewLanguage({ ...newLanguage, level: e.target.value })
                }
                className="w-40"
              />
              <Button onClick={handleAddLanguage} disabled={createLanguage.isPending}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {languagesLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="space-y-2">
                {languages?.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex items-center justify-between p-3 border border-divider rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{lang.language}</span>
                      <span className="text-subtle ml-2">({lang.level})</span>
                    </div>
                    <button
                      onClick={() => deleteLanguage.mutate(lang.id)}
                      className="text-subtle hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experiences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Experiencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4 p-4 border border-divider rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Empresa"
                  value={newExperience.company}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, company: e.target.value })
                  }
                />
                <Input
                  placeholder="Rol"
                  value={newExperience.role}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, role: e.target.value })
                  }
                />
              </div>
              <Input
                placeholder="Período (ej: Ene 2024 - Actualidad)"
                value={newExperience.period}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, period: e.target.value })
                }
              />
              <textarea
                placeholder="Descripción (una línea por punto)"
                value={newExperience.descriptionText}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, descriptionText: e.target.value })
                }
                className="w-full min-h-[80px] px-3 py-2 border border-divider rounded-lg bg-background text-sm resize-none focus:outline-none focus:ring-1 focus:ring-foreground"
              />
              <Button
                onClick={handleAddExperience}
                disabled={createExperience.isPending}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir experiencia
              </Button>
            </div>

            {experiencesLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="space-y-4">
                {experiences?.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 border border-divider rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-medium">{exp.company}</span>
                        <span className="text-subtle mx-2">·</span>
                        <span className="text-subtle">{exp.role}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-subtle">{exp.period}</span>
                        <button
                          onClick={() => deleteExperience.mutate(exp.id)}
                          className="text-subtle hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <ul className="text-sm text-subtle space-y-1">
                      {exp.description.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAbout;
