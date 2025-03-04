import React from "react";
import PropTypes from "prop-types";

export const EmailTemplate = ({ id, cart, date, userName }) => (
    <div style={styles.container}>
        <div style={styles.header}>
            <p style={styles.greeting}>¡Hola, {userName}!</p>
            <p style={styles.subheading}>Factura de tu orden #{id}</p>
        </div>
        
        <div style={styles.details}>
            <p style={styles.detail}>Fecha de aprobación: {date}</p>
            <div style={styles.detail}>
                Detalles del carrito: 

                <div>
                    {cart.map(c => <>
                        <div key={c.id}>
                            <img src={"/uploads/"+c.portait} alt="Imgen de portata del curso" />
                            <h3>{c.title}</h3>
                            <p>{c.description}</p>
                            <p>$ {c.price}</p>
                        </div>
                    </>)}
                </div>
            </div>
        </div>

        <div style={styles.footer}>
            <p style={styles.footerText}>Gracias por usar My Learning</p>
        </div>
    </div>
);

EmailTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};

const styles = {
  container: {
    fontFamily: '"Arial", sans-serif',
    color: '#333',
    backgroundColor: '#f5f5f5',
    margin: '0',
    padding: '20px',
  },
  header: {
    backgroundColor: '#2d3748',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px 8px 0 0',
  },
  greeting: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '14px',
    marginTop: '5px',
    fontStyle: 'italic',
    color: "#FFFFFF",
  },
  details: {
    backgroundColor: '#fff',
    padding: '20px',
    marginTop: '15px',
    borderRadius: '0 0 8px 8px',
  },
  detail: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  footerText: {
    color: '#2d3748',
  },
};
