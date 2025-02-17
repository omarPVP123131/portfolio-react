import React, { useState } from "react";
import { Mail, Github, Linkedin, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

// EmailJS constants - Replace with your credentials
const EMAILJS_SERVICE_ID = "service_3nqqzjg";
const EMAILJS_TEMPLATE_ID = "template_11t9p2s";
const EMAILJS_PUBLIC_KEY = "ynpovkgOtTUDsrurL";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
}

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactSectionProps {
  contactoRef: React.RefObject<HTMLElement>;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
    aria-label={label}
  >
    {icon}
  </a>
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  required,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }
          dark:bg-gray-700 dark:border-gray-600 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500`}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }
          dark:bg-gray-700 dark:border-gray-600 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500`}
      />
    )}
    {error && (
      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
    )}
  </div>
);

const ContactSection: React.FC<ContactSectionProps> = ({ contactoRef }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email inválido";
    }

    if (formData.phone && !/^\+?\d{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Formato inválido. Incluye el código de país (ej: +52)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    setIsSubmitting(true);

    const toastId = toast.loading("Enviando mensaje...");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_name: "Admin",
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        toast.success("¡Mensaje enviado con éxito! Me pondré en contacto pronto.", {
          id: toastId,
          duration: 5000,
        });

        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
        {
          id: toastId,
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={contactoRef}
      id="contacto"
      className="py-16 bg-white dark:bg-gray-800 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Hablemos!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Estoy disponible para colaboraciones y
            nuevas oportunidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Conectemos
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Estoy disponible para proyectos freelance y oportunidades
                laborales. ¡Conversemos sobre cómo puedo ayudar en tu próximo
                proyecto!
              </p>
              <div className="flex space-x-4">
                <SocialIcon
                  href="https://github.com/omarPVP123131"
                  icon={<Github size={24} />}
                  label="GitHub"
                />
                <SocialIcon
                  href="#"
                  icon={<Linkedin size={24} />}
                  label="LinkedIn"
                />
                <SocialIcon
                  href="mailto:omarpalvel@gmail.com"
                  icon={<Mail size={24} />}
                  label="Email"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Nombre"
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Tu nombre completo"
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="tu@email.com"
              />
              <InputField
                label="Teléfono"
                id="phone"
                type="tel"
                required={false}
                value={formData.phone ?? ''}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+52 1234567890"
              />
              <InputField
                label="Mensaje"
                id="message"
                type="textarea"
                required
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Cuéntame sobre tu proyecto..."
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg
                  hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                  transition-colors duration-200 disabled:opacity-50
                  disabled:cursor-not-allowed font-medium text-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;