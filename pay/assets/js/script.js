document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("property-table");
    const rutInput = document.getElementById("rut-input");
    const viewTenantDataButton = document.getElementById("view-tenant-data");
    const viewLandlordDataButton = document.getElementById("view-landlord-data");

    // Clave secreta para la vista de arrendador
    const landlordPassword = "clave123";

    // Cargar datos del arrendatario
    viewTenantDataButton.addEventListener("click", () => {
        const rut = rutInput.value.trim();
        if (!rut) {
            alert("Por favor, ingrese un RUT válido.");
            return;
        }
        const filteredData = propertiesData.filter(item => item.rut === rut);
        if (filteredData.length === 0) {
            alert("No se encontraron datos para este RUT.");
        } else {
            loadTable(filteredData);
        }
    });

    // Cargar datos del arrendador con clave
    viewLandlordDataButton.addEventListener("click", () => {
        const password = prompt("Ingrese la clave de arrendador:");
        if (password === landlordPassword) {
            loadTable(propertiesData);
        } else {
            alert("Clave incorrecta.");
        }
    });

    // Función para cargar la tabla
    function loadTable(data) {
        tableBody.innerHTML = ""; // Limpiar la tabla
        data.forEach(item => {
            const { property, tenant, month, year, services } = item;

            // Crear una sola fila por mes y año
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${property}</td>
                <td>${tenant}</td>
                <td class="status-${services.rent.status}">
                    ${services.rent.amount} (${capitalize(services.rent.status)})
                </td>
                <td class="status-${services.electricity.status}">
                    ${services.electricity.amount} (${capitalize(services.electricity.status)})
                </td>
                <td class="status-${services.water.status}">
                    ${services.water.amount} (${capitalize(services.water.status)})
                </td>
                <td class="status-${services.gas.status}">
                    ${services.gas.amount} (${capitalize(services.gas.status)})
                </td>
                <td class="status-${services.cable.status}">
                    ${services.cable.amount} (${capitalize(services.cable.status)})
                </td>
                <td>${month}</td>
                <td>${year}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Función para capitalizar palabras
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
