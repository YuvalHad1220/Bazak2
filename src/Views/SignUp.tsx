import Card from "../Components/Card";
import Form from "../Components/Form";
import { iField } from "../interfaces";

const SignUpView = () => {

    const signUpForm: iField[] = [
        {
            fieldType: "TITLE",
            id: "personalHeader",
            title: "פרטים אישיים"
        },
        {
            fieldType: "TEXT_FIELD",
            id: "fName",
            title: "שם פרטי",
            width: 6
        },
        {
            fieldType: "TEXT_FIELD",
            id: "lName",
            title: "שם משפחה",
            width: 6
        },
        {
            fieldType: "TEXT_FIELD",
            id: "pNum",
            title: "מספר אישי",
            width: 6
        },
        {
            fieldType: "TITLE",
            id: "permissionTitle",
            title: "סוג הרשאה"
        },
        {
            fieldType: "SELECT",
            id: "permissionType",
            title: "סוג הרשאה",
            options: [
                {id: "gdod", value: "גדוד"},
                {id: "hativa", value: "חטיבה"},
                {id: "ogda", value: "אוגדה"},
                {id: "pikod", value: "פיקוד"},
                {id: "all", value: "כלל צהל"},
                {id: "manager", value: "מנהל"}
            ],
        },
        {
            fieldType: "SELECT",
            id: "selectPermissionValue",
            title: "יחידה",
            dependsOn: "permissionType",
            options: [
                {
                    id: "test", value:"צריך עדיין להכניס את האופציה של הצגת אופציות לפי מפתח"
                }
            ]
        },
        {
            fieldType: "DATE",
            id: "signUpDate",
            title: "תאריך הרשמה (בדיקת דייט פיקר)"
        }
    ];

    return (
        <Card>
            <Form fields={signUpForm}
            onValidated={console.log} />
        </Card>
    )

};

export default SignUpView;