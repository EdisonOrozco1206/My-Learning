export const api = {
    message: {
        async submit(cart, userData) {
            try {
                const response = await fetch(process.env.BASE_URL+"/api/checkout", {
                    method: "POST",
                    body: JSON.stringify({ cart, userData }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
        
                if (!response.ok) {
                    throw new Error("Error al crear la preferencia");
                }
        
                const data = await response.json();
                return data.init_point;
            } catch (error) {
                console.error("Error en el pago:", error);
                throw error;
            }
        }
    }
  };
  