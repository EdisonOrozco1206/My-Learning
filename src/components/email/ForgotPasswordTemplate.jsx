import React from "react";
import PropTypes from "prop-types";

export const ForgotPasswordTemplate = ({ userName, userId }) => (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.greeting}>¡Hola, {userName}!</p>
      </div>
      
      <div style={styles.details}>
        <p style={styles.detail}>Haz click en el siguiente botón para cambiar tu contraseña de My Learning</p>
        <p style={styles.button}>
          <a href={`${process.env.BASE_URL}/user/forgotPassword/change?id=${userId}`}>Cambiar tu contraseña</a>
        </p>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>Gracias por usar My Learning</p>
      </div>
    </div>
);

ForgotPasswordTemplate.propTypes = {
  userName: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
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
  button: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
    color: "#ffffff",
  },
  footerText: {
    color: '#2d3748',
  },
};
