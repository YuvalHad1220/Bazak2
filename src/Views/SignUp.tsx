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
            width: 6,
            registerOptions: {
                required: "שם פרטי דרוש להרשמה"
            }
        },
        {
            fieldType: "TEXT_FIELD",
            id: "lName",
            title: "שם משפחה",
            width: 6,
            registerOptions: {
                required: "שם משפחה דרוש להרשמה"
            }
        },
        {
            fieldType: "TEXT_FIELD",
            id: "pNum",
            title: "מספר אישי",
            width: 6,
            registerOptions: {
                required: "מספר אישי דרוש להרשמה",
                minLength: {
                    value: 8,
                    message: "מספר אישי חייב להיות בדיוק 7 תווים"
                },
                maxLength: {
                    value: 8,
                    message: "מספר אישי חייב להיות בדיוק 8 תווים כולל מזהה חוגר"
                },
                pattern: {
                    value: /^(c|s).*/,
                    message: "מספר אישי חייב להתחיל עם מזהה חוגר, כגון s, c וכו'"
                }
            }
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
                    id: "admin", value:"צריך עדיין להכניס את האופציה של הצגת אופציות לפי מפתח, כרגע יכניס id = admin"
                }
            ]
        },
        {
            fieldType: "SELECT",
            id: "permissions",
            title: "הרשאות עריכה וצפייה",
            options: [
                { id: "editAndView", value: "צפייה ועריכה"},
                { id: "justView", value: "צפייה בלבד"}
            ],
            defaultValue: { id: "justView", value: "צפייה בלבד"}
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