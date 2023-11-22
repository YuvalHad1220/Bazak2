import DashboardCard from "../Components/DashboardCard";

const DashboardView = () => {
    return <DashboardCard redThres={30} yellowThres={70} title="מרכבה 4" upperDescription="טנק \ מרכבה \ 4 \ מקט 3324" lowerDescription={["סדיר", "הכן", "אחי"]} trueCount={400} falseCount={200}/>
};

export default DashboardView;