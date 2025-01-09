document.addEventListener("DOMContentLoaded", async function () {
    const propertyTable = document.getElementById("property-table");
    const ufValueDisplay = document.getElementById("ufValueDisplay");
    const convertButton = document.getElementById("convertButton");
    const conversionResult = document.getElementById("conversionResult");
    const ufAmountInput = document.getElementById("ufAmount");

    // Función para obtener el valor de la UF y mostrarlo en el subtítulo
    async function fetchUFValue() {
        try {
            const response = await fetch("https://mindicador.cl/api");
            if (!response.ok) {
                throw new Error("No se pudo obtener el valor de la UF.");
            }
            const data = await response.json();
            const ufValue = data.uf.valor;
            const today = new Date();
            const formattedDate = today.toLocaleDateString("es-CL", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            ufValueDisplay.textContent = `UF: $${ufValue.toLocaleString("es-CL")} (al ${formattedDate})`;

            return ufValue;
        } catch (error) {
            console.error("Error al obtener el valor de la UF:", error);
            ufValueDisplay.textContent = "No se pudo cargar el valor de la UF.";
            return null;
        }
    }

    // Función para cargar datos de la tabla desde un archivo JSON
    async function loadPropertyData() {
        try {
            const response = await fetch("./data.json");
            if (!response.ok) {
                throw new Error("No se pudo cargar los datos de propiedades.");
            }
            const properties = await response.json();

            propertyTable.innerHTML = "";

            properties.forEach((property) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${property.propiedad}</td>
                    <td>${property.arrendatario}</td>
                    <td class="${getStatusClass(property.renta.estado)}">${formatCurrency(property.renta.monto)} (${property.renta.estado})</td>
                    <td class="${getStatusClass(property.electricidad.estado)}">${formatCurrency(property.electricidad.monto)} (${property.electricidad.estado})</td>
                    <td class="${getStatusClass(property.agua.estado)}">${formatCurrency(property.agua.monto)} (${property.agua.estado})</td>
                    <td class="${getStatusClass(property.gas.estado)}">${formatCurrency(property.gas.monto)} (${property.gas.estado})</td>
                    <td class="${getStatusClass(property.cable.estado)}">${formatCurrency(property.cable.monto)} (${property.cable.estado})</td>
                    <td>${property.mes}</td>
                    <td>${property.año}</td>
                `;

                propertyTable.appendChild(row);
            });
        } catch (error) {
            console.error("Error al cargar los datos de propiedades:", error);
        }
    }

    function formatCurrency(value) {
        return `$${value.toLocaleString("es-CL")}`;
    }

    function getStatusClass(status) {
        switch (status) {
            case "Paid":
                return "paid";
            case "Unpaid":
                return "unpaid";
            case "Pending":
                return "pending";
            default:
                return "";
        }
    }

    async function handleUFConversion() {
        const ufValue = await fetchUFValue();
        if (ufValue === null) {
            conversionResult.textContent = "No se pudo realizar la conversión.";
            return;
        }

        const ufAmount = parseFloat(ufAmountInput.value);
        if (isNaN(ufAmount) || ufAmount <= 0) {
            conversionResult.textContent = "Por favor, ingrese un monto válido en UF.";
            return;
        }

        const conversionResultValue = ufAmount * ufValue;
        conversionResult.textContent = `El monto en pesos chilenos es: $${conversionResultValue.toLocaleString("es-CL")}`;
    }

    convertButton.addEventListener("click", handleUFConversion);

    await fetchUFValue();
    await loadPropertyData();
});
