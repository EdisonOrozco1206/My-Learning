import React from "react";
import { Document, Text, Page, StyleSheet, Image, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 40,
        fontFamily: "Helvetica",
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        marginBottom: 20,
        textAlign: "center",
        width: "80%",
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 10,
    },
    boldText: {
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 10,
    },
    studentName: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
    },
    courseImage: {
        width: 200,
        height: 100,
        alignSelf: "center",
        marginBottom: 10,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    instructor: {
        fontSize: 14,
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 20,
    },
    signature: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 14,
    },
    date: {
        marginTop: 20,
        fontSize: 12,
        textAlign: "center",
    }
});

const PDF = ({user, course}) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
    const formattedTime = currentDate.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true });

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.logo} source={{uri: "/static/logo.png"}} />
                    <Text style={styles.title}>My Learning</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        En <Text style={styles.boldText}>My Learning</Text> nos enorgullecemos de las habilidades de nuestros estudiantes,
                        consecuente a esto hacemos constancia de nuestro(a) estudiante y la evolución de
                        sus capacidades, por lo tanto otorgamos el siguiente certificado a...
                    </Text>
                    <Text style={styles.studentName}>{user.name} {user.lastname}</Text>
                    <Text style={styles.boldText}>Identificado con {user.document_type} No° {user.document}</Text>
                    <Text style={styles.text}>Por demostrar sus habilidades y completar satisfactoriamente el curso:</Text>
                    <Image style={styles.courseImage} source={{uri: "/uploads/"+course.portait}} />
                    <Text style={styles.courseTitle}>Curso - {course.title}</Text>
                    <Text style={styles.instructor}>Impartido por nuestro(a) instructor(a) <Text style={styles.boldText}>{course.instructor.name} {course.instructor.lastname}</Text></Text>
                </View>
                <View style={styles.signature}>
                    <Text style={styles.boldText}>Edison Andres Orozco Pulgarin</Text>
                    <Text>Director de <Text style={styles.boldText}>My Learning</Text></Text>
                </View>
                <View style={styles.date}>
                    <Text>Expedido a las <Text style={styles.boldText}>{formattedTime}</Text> del día <Text style={styles.boldText}>{formattedDate}</Text></Text>
                </View>
            </Page>
        </Document>
    );
};

export default PDF