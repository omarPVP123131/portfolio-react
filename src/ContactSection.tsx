import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

// Constantes de EmailJS - Reemplaza con tus credenciales
const EMAILJS_SERVICE_ID = "service_3nqqzjg";
const EMAILJS_TEMPLATE_ID = "template_11t9p2s";
const EMAILJS_PUBLIC_KEY = "ynpovkgOtTUDsrurL";

interface CustomAlertProps {
  children: React.ReactNode;
  className?: string;
  status?: "success" | "error";
}

interface CustomAlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CustomAlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  children,
  className = "",
  status = "success",
}) => {
  return (
    <div className={`p-4 rounded-lg mb-4 ${className}`} role="alert">
      {children}
    </div>
  );
};

const CustomAlertTitle: React.FC<CustomAlertTitleProps> = ({
  children,
  className = "",
}) => <h3 className={`text-lg font-semibold mb-1 ${className}`}>{children}</h3>;

const CustomAlertDescription: React.FC<CustomAlertDescriptionProps> = ({
  children,
  className = "",
}) => <p className={`text-sm ${className}`}>{children}</p>;

// Rest of the interfaces remain the same...
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
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

interface SubmitStatus {
  status: "" | "success" | "error";
  message: string;
}

interface ContactSectionProps {
  contactoRef: React.RefObject<HTMLElement>;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
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
}) => (
  <div className="space-y-1">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      required={required}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full rounded-md shadow-sm
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        }
        dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
    />
    {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
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
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    status: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    // Validación opcional para el teléfono (si se desea)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Número de teléfono inválido. Debe tener 10 dígitos.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ status: "", message: "" });

    try {
      // Preparar los parámetros para EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_name: "Admin", // Puedes personalizar esto
      };

      // Enviar el email usando EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus({
          status: "success",
          message: "¡Mensaje enviado con éxito! Me pondré en contacto pronto.",
        });

        setFormData({ name: "", email: "", phone: "", message: "" }); // Reiniciar todos los campos
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        status: "error",
        message:
          "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={contactoRef}
      id="contacto"
      className="py-16 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
          Contacto
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Conectemos!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Estoy disponible para proyectos freelance y oportunidades
                laborales. ¡Hablemos sobre cómo puedo ayudar en tu próximo
                proyecto!
              </p>
              <div className="flex space-x-6">
                <SocialIcon
                  href="https://github.com/omarPVP123131"
                  icon={<FaGithub size={28} />}
                  label="GitHub"
                />
                <SocialIcon
                  href="#"
                  icon={<FaLinkedin size={28} />}
                  label="LinkedIn"
                />
                <SocialIcon
                  href="mailto:omarpalvel@gmail.com"
                  icon={<FaEnvelope size={28} />}
                  label="Email"
                />
              </div>
            </div>
          </div>

          <div>
            {submitStatus.status && (
              <CustomAlert
                className={
                  submitStatus.status === "success"
                    ? "bg-green-50 dark:bg-green-900/30"
                    : "bg-red-50 dark:bg-red-900/30"
                }
              >
                <CustomAlertTitle
                  className={
                    submitStatus.status === "success"
                      ? "text-green-800 dark:text-green-300"
                      : "text-red-800 dark:text-red-300"
                  }
                >
                  {submitStatus.status === "success" ? "¡Éxito!" : "Error"}
                </CustomAlertTitle>
                <CustomAlertDescription
                  className={
                    submitStatus.status === "success"
                      ? "text-green-700 dark:text-green-200"
                      : "text-red-700 dark:text-red-200"
                  }
                >
                  {submitStatus.message}
                </CustomAlertDescription>
              </CustomAlert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Nombre"
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                label="Teléfono (opcional, Ingresa Tu Codigo De area, Ejemplo +52)"
                id="phone"
                type="tel"
                required={false}
                value={formData.phone ?? ''}
                onChange={handleChange}
                error={errors.phone}
              />
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm
                    ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.message && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 
                  dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-50
                  disabled:cursor-not-allowed font-medium text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
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
