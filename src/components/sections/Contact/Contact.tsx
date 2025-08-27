import React from "react";
import { useContent } from "../../../hooks/useContent";
import type { ContactContent } from "../../../types/content";
import styles from "./Contact.module.css";

export const Contact: React.FC = () => {
  const content = useContent<ContactContent>("contact.json");

  if (!content) {
    return <section className={styles.contact}>Loading...</section>;
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        {content.sectionHeader && (
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {content.sectionHeader.title}
            </h2>
            {content.sectionHeader.subtitle && (
              <p className={styles.sectionSubtitle}>
                {content.sectionHeader.subtitle}
              </p>
            )}
          </div>
        )}

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {(
            content.form?.fields ?? [
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                required: true,
              },
            ]
          ).map((field) => (
            <div key={field.name} className={styles.field}>
              <label className={styles.label} htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  className={styles.textarea}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className={styles.input}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <button className={styles.submit} type="submit">
            {content.form?.submit?.label ?? "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};
