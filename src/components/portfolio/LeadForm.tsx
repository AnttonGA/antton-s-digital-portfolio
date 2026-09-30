import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageContext";

const FORM_NAME = "valoracion";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

const initialState = { name: "", email: "", empresa: "", mensaje: "" };

const LeadForm = () => {
  const t = useT();
  const [values, setValues] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const botField = (form.elements.namedItem("bot-field") as HTMLInputElement)?.value;
    if (botField) return; // honeypot: bot detected, silently ignore

    setSubmitting(true);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, ...values }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDone(true);
      setValues(initialState);
      toast.success(t.leadForm.toastSuccess);
    } catch {
      toast.error(t.leadForm.toastError);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="border border-divider rounded-lg p-8 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
          <Check size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{t.leadForm.successTitle}</h3>
        <p className="text-sm text-subtle font-light">{t.leadForm.successBody}</p>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Necesario para que Netlify asocie el envío con el formulario */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot anti-spam: oculto para personas, tentador para bots */}
      <p className="hidden">
        <label>
          No rellenar este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="space-y-2">
        <Label htmlFor="lf-name">{t.leadForm.name}</Label>
        <Input
          id="lf-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder={t.leadForm.namePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lf-email">{t.leadForm.email}</Label>
        <Input
          id="lf-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder={t.leadForm.emailPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lf-empresa">
          {t.leadForm.empresa} <span className="text-subtle font-normal">{t.leadForm.empresaOptional}</span>
        </Label>
        <Input
          id="lf-empresa"
          name="empresa"
          value={values.empresa}
          onChange={handleChange}
          autoComplete="organization"
          placeholder={t.leadForm.empresaPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lf-mensaje">{t.leadForm.mensaje}</Label>
        <Textarea
          id="lf-mensaje"
          name="mensaje"
          value={values.mensaje}
          onChange={handleChange}
          required
          rows={4}
          placeholder={t.leadForm.mensajePlaceholder}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.leadForm.submitting}
          </>
        ) : (
          t.leadForm.submit
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
