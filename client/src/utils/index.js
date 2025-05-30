export const formatDate = (date) => {
    
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
};
  
export function dateFormatter(dateString) {

    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
  
export function getInitials(fullName = "") {
    if (typeof fullName !== "string" || fullName.trim() === "") {
      return "";
    }
  
    const names = fullName.trim().split(" ");
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    return initials.join("");
  }
  

export const PRIOTITYSTYELS = {
    high: "text-red-400",
    medium: "text-yellow-400",
    low: "text-blue-400",
};
  
export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-400",
    completed: "bg-green-400",
};
  
export const BGS = [
    "bg-blue-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-green-400",
];