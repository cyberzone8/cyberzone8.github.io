document.addEventListener("DOMContentLoaded", function () {
    const propertyTable = document.getElementById("property-table");
    const ufValueDisplay = document.getElementById("ufValueDisplay");
    const convertButton = document.getElementById("convertButton");
    const conversionResult = document.getElementById("conversionResult");
    const ufAmountInput = document.getElementById("ufAmount");

    const viewTenantDataButton = document.getElementById("view-tenant-data");
    const viewLandlordDataButton = document.getElementById("view-landlord-data");

    let authorizedRole = null; // Variable para almacenar el rol autorizado

    async function fetchUFValue() {
        try {
            const response = await fetch("/api/uf");
            if (!response.ok) throw new Error();
            const data = await response.json();
            return data.uf || 38438.98;
        } catch {
            return 38438.98;
        }
    }

    async function getKeys(role) {
        try {
            const response = await fetch(`/api/keys?role=${role}`);
            if (!response.ok) throw new Error();
            const data = await response.json();
            return data.key;
        } catch (error) {
            console.error("Error al obtener las claves:", error);
            return null;
        }
    }

    async function handleTenantAccess() {
        const password = prompt("Ingrese la clave para acceder a sus datos:");
        const storedPassword = await getKeys("tenant");
        if (password === storedPassword) {
            authorizedRole = "tenant";
            alert("Acceso concedido como Arrendatario.");
            loadPropertyData();
        } else {
            alert("Clave incorrecta. Intente nuevamente.");
            authorizedRole = null;
            loadPropertyData();
        }
    }

    async function handleLandlordAccess() {
        const password = prompt("Ingrese la clave para acceder a los datos de arrendador:");
        const storedPassword = await getKeys("landlord");
        if (password === storedPassword) {
            authorizedRole = "landlord";
            alert("Acceso concedido como Arrendador.");
            loadPropertyData();
        } else {
            alert("Clave incorrecta. Intente nuevamente.");
            authorizedRole = null;
            loadPropertyData();
        }
    }

    function loadPropertyData() {
        if (!authorizedRole) {
            propertyTable.innerHTML = `<tr><td colspan="9">Debes ingresar una clave válida para ver los datos.</td></tr>`;
            return;
        }

        const rows = propertiesData.map(property => `
            <tr>
                <td>${property.property}</td>
                <td>${property.tenant}</td>
                <td>${property.services.rent.amount}</td>
                <td>${property.services.electricity}</td>
                <td>${property.services.water}</td>
                <td>${property.services.gas}</td>
                <td>${property.services.cable}</td>
                <td>${property.month}</td>
                <td>${property.year}</td>
            </tr>
        `).join("");
        propertyTable.innerHTML = rows;
    }

    fetchUFValue().then(value => ufValueDisplay.textContent = `Valor UF: $${value.toFixed(2)}`);
    convertButton.addEventListener("click", async () => {
        const ufValue = await fetchUFValue();
        const ufAmount = parseFloat(ufAmountInput.value || 0);
        conversionResult.textContent = `El monto en pesos es: $${(ufAmount * ufValue).toFixed(2)}`;
    });

    viewTenantDataButton.addEventListener("click", handleTenantAccess);
    viewLandlordDataButton.addEventListener("click", handleLandlordAccess);

    loadPropertyData();
});
