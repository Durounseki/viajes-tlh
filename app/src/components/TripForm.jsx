import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import styles from "../styles/AdminForm.module.css";
import { usePaymentPlans, useCreatePaymentPlan } from "../data/paymentPlans";
import { useIncludedItems, useCreateIncludedItem } from "../data/includedItems";
import { formatDateForInput } from "../utils/tripDate";

function TripForm({ initialData, onSubmit, isEditing = false }) {
  const navigate = useNavigate();
  const { data: availablePlans = [] } = usePaymentPlans();
  const createPaymentPlanMutation = useCreatePaymentPlan();
  const { data: availableItems = [] } = useIncludedItems();
  const createIncludedItemMutation = useCreateIncludedItem();
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
    description: "",
    itinerary: "",
    recommendations: "",
    policies: "",
    notes: "",
    includedItems: [],
    paymentPlanId: "",
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        ...initialData,
        startDate: formatDateForInput(initialData.startDate),
        endDate: formatDateForInput(initialData.endDate),
        includedItems: initialData.includedItems?.map((item) => item.id) || [],
      });
    }
  }, [initialData, isEditing]);

  const [formErrors, setFormErrors] = useState({});
  const [newItemName, setNewItemName] = useState("");
  const [isPlanModalOpen, setPlanModalOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [installments, setInstallments] = useState([
    { description: "Anticipo", percentage: 50, daysBeforeTrip: 90 },
  ]);

  const validateField = (name, value, isDraft = false) => {
    let error = "";
    const requiredFields = [
      "destination",
      "startDate",
      "endDate",
      "price",
      "description",
      "itinerary",
    ];
    if (isDraft && name === "destination" && !value) {
      return "El destino es necesario para guardar un borrador.";
    }
    if (!isDraft && requiredFields.includes(name) && !value) {
      error = "Este campo es obligatorio.";
    } else if (
      name === "price" &&
      !isDraft &&
      (isNaN(value) || Number(value) <= 0)
    ) {
      error = "El precio debe ser un número positivo.";
    } else if (
      name === "endDate" &&
      formData.startDate &&
      new Date(value) < new Date(formData.startDate)
    ) {
      error = "La fecha de fin no puede ser anterior a la fecha de inicio.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const newIncludedItems = checked
        ? [...formData.includedItems, value]
        : formData.includedItems.filter((item) => item !== value);
      setFormData({ ...formData, includedItems: newIncludedItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleAddNewItem = () => {
    if (!newItemName.trim()) return;
    const existingItem = availableItems.find(
      (item) => item.name.toLowerCase() === newItemName.toLowerCase()
    );
    if (existingItem) {
      alert("El item ya existe.");
      if (!formData.includedItems.includes(existingItem.id)) {
        setFormData({
          ...formData,
          includedItems: [...formData.includedItems, existingItem.id],
        });
      }
      setNewItemName("");
      return;
    }

    const newItemData = { name: newItemName };
    console.log("Submitting new item:", newItemData);
    createIncludedItemMutation.mutate(newItemData, {
      onSuccess: (newItem) => {
        console.log("New item created:", newItem);
        setFormData({
          ...formData,
          includedItems: [...formData.includedItems, newItem.id],
        });
        setNewItemName("");
      },
      onError: (error) => {
        console.error("Failed to create included item:", error);
        alert("No se pudo guardar el item. Intentalo de nuevo.");
      },
    });
  };

  const addInstallment = () => {
    setInstallments([
      ...installments,
      { description: "", percentage: "", daysBeforeTrip: "" },
    ]);
  };

  const handleInstallmentChange = (index, field, value) => {
    const updatedInstallments = [...installments];
    updatedInstallments[index][field] = value;
    setInstallments(updatedInstallments);
  };

  const removeInstallment = (index) => {
    if (installments.length > 1) {
      setInstallments(installments.filter((_, i) => i !== index));
    }
  };

  const handleSaveNewPlan = () => {
    if (!newPlanName.trim()) {
      alert("El plan de pago debe tener un nombre.");
      return;
    }
    const totalPercentage = installments.reduce(
      (sum, inst) => sum + Number(inst.percentage || 0),
      0
    );
    if (totalPercentage !== 100) {
      alert(
        `La suma de los porcentajes es ${totalPercentage}%. Debe ser exactamente 100%.`
      );
      return;
    }
    for (const inst of installments) {
      if (!inst.description || !inst.percentage || !inst.daysBeforeTrip) {
        alert("Todos los campos de los pagos parciales son obligatorios.");
        return;
      }
    }

    const newPlanData = {
      name: newPlanName,
      installments: installments.map((inst) => ({
        description: inst.description,
        percentage: Number(inst.percentage),
        daysBeforeTrip: Number(inst.daysBeforeTrip),
      })),
    };

    console.log("Submitting new payment plan:", newPlanData);

    createPaymentPlanMutation.mutate(newPlanData, {
      onSuccess: (newPlan) => {
        console.log("New plan created:", newPlan);
        setFormData({ ...formData, paymentPlanId: newPlan.id });
        setPlanModalOpen(false);
        setNewPlanName("");
        setInstallments([
          { description: "Anticipo", percentage: 50, daysBeforeTrip: 90 },
        ]);
      },
      onError: (error) => {
        console.error("Failed to create payment plan:", error);
        alert("No se pudo guardar el plan de pago. Intentalo de nuevo.");
      },
    });
  };

  const handleSave = async (isDraft = false) => {
    const errors = {};
    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name], isDraft);
      if (error) errors[name] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Por favor, corrige los errores antes de guardar.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      status: isDraft ? "DRAFT" : "PUBLISHED",
      price: parseInt(formData.price, 10) || 0,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      includedItems: {
        connect: formData.includedItems.map((id) => ({ id })),
      },
    };

    console.log(
      `Saving as ${dataToSubmit.status}:`,
      JSON.stringify(dataToSubmit, null, 2)
    );

    onSubmit(formData, isDraft);
  };

  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >
        <h2>{isEditing ? "Editar Viaje" : "Crear Nuevo Viaje"}</h2>

        <fieldset>
          <legend>Información Básica</legend>
          <div className={styles.formGroup}>
            <label htmlFor="destination">Destino</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {formErrors.destination && (
              <p className={styles.errorMessage}>{formErrors.destination}</p>
            )}
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Fecha de Inicio</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {formErrors.startDate && (
                <p className={styles.errorMessage}>{formErrors.startDate}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate">Fecha de Fin</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {formErrors.endDate && (
                <p className={styles.errorMessage}>{formErrors.endDate}</p>
              )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Precio (MXN)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej: 4500"
              required
            />
            {formErrors.price && (
              <p className={styles.errorMessage}>{formErrors.price}</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Detalles del Viaje</legend>
          <div className={styles.formGroup}>
            <label htmlFor="description">Descripción (breve)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              required
            ></textarea>
            {formErrors.description && (
              <p className={styles.errorMessage}>{formErrors.description}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="itinerary">Itinerario</label>
            <textarea
              id="itinerary"
              name="itinerary"
              value={formData.itinerary}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="8"
              required
              placeholder="Día 1: Salida de CDMX...\nDía 2: Visita a..."
            ></textarea>
            {formErrors.itinerary && (
              <p className={styles.errorMessage}>{formErrors.itinerary}</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>¿Qué Incluye?</legend>
          <div className={styles.checkboxGroup}>
            {availableItems.map((item) => (
              <label key={item.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="includedItems"
                  value={item.id}
                  checked={formData.includedItems.includes(item.id)}
                  onChange={handleChange}
                />
                {item.name}
              </label>
            ))}
          </div>
          <div className={styles.inlineAddForm}>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="O agregar uno nuevo..."
            />
            <button
              type="button"
              onClick={handleAddNewItem}
              className={styles.addButton}
            >
              +
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Información Adicional</legend>
          <div className={styles.formGroup}>
            <label htmlFor="recommendations">Recomendaciones</label>
            <textarea
              id="recommendations"
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              rows="4"
              placeholder="Ej: Llevar bloqueador solar, ropa cómoda..."
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="policies">Políticas</label>
            <textarea
              id="policies"
              name="policies"
              value={formData.policies}
              onChange={handleChange}
              rows="4"
              placeholder="Ej: Política de cancelación..."
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="notes">Notas Adicionales (opcional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
        </fieldset>

        <fieldset>
          <legend>Plan de Pago</legend>
          <div className={styles.formGroup}>
            <div className={styles.selectWithButton}>
              <select
                id="paymentPlanId"
                name="paymentPlanId"
                value={formData.paymentPlanId}
                onChange={handleChange}
              >
                <option value="">Elige un plan de pago</option>
                {availablePlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <div className={styles["add-plan"]}>
                <p>Otro plan de pago</p>
                <button
                  type="button"
                  onClick={() => setPlanModalOpen(true)}
                  className={styles.addButton}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryButton}>
            {isEditing ? "Guardar Cambios" : "Publicar Viaje"}
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className={styles.draftButton}
          >
            Guardar Borrador
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate({ to: "/admin/viajes" })}
          >
            Cancelar
          </button>
        </div>
      </form>

      {isPlanModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setPlanModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Crear Nuevo Plan de Pago</h3>

            <div className={styles.formGroup}>
              <label htmlFor="newPlanName">Nombre del Plan</label>
              <input
                type="text"
                id="newPlanName"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                placeholder="Ej: Plan a 3 Pagos"
              />
            </div>

            <hr className={styles.modalSeparator} />

            <label>Pagos Parciales</label>
            {installments.map((inst, index) => (
              <div key={index} className={styles.installmentRow}>
                <input
                  type="text"
                  placeholder="Descripción"
                  value={inst.description}
                  onChange={(e) =>
                    handleInstallmentChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  required
                />
                <div className={styles.inputWithAdornment}>
                  <input
                    type="number"
                    placeholder="%"
                    value={inst.percentage}
                    onChange={(e) =>
                      handleInstallmentChange(
                        index,
                        "percentage",
                        e.target.value
                      )
                    }
                    required
                  />
                  <span>%</span>
                </div>
                <div className={styles.inputWithAdornment}>
                  <input
                    type="number"
                    placeholder="Días"
                    value={inst.daysBeforeTrip}
                    onChange={(e) =>
                      handleInstallmentChange(
                        index,
                        "daysBeforeTrip",
                        e.target.value
                      )
                    }
                    required
                  />
                  <span>días antes</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeInstallment(index)}
                  className={styles.deleteButtonSmall}
                  disabled={installments.length <= 1}
                >
                  &times;
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addInstallment}
              className={styles.secondaryButton}
            >
              + Añadir Pago
            </button>

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={handleSaveNewPlan}
                className={styles.primaryButton}
              >
                Guardar Plan
              </button>
              <button
                type="button"
                onClick={() => setPlanModalOpen(false)}
                className={styles.secondaryButton}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripForm;
