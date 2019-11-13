import React from "react";

const colors = [
  "#F44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
  "#3f51b5",
  "#2196F3",
  "#00bcd4",
  "#009688",
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
  "#4CAF50",
  "#ffeb3b",
  "#ffc107",
];

export function getAvatarColor(name) {
  name = name.substr(0, 6);

  var hash = 0;
  for (var i = 0; i < name.length; i++) {
    hash = 31 * hash + name.charCodeAt(i);
  }
  var index = Math.abs(hash % colors.length);
  return colors[index];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return monthNames[monthIndex] + " " + year;
}

const errorItemsNode = (data) => {
  if (data.errors) {
    const errorItems = Object.keys(data.errors).map((key, item) => {
      if (data.errors[key] && data.errors[key].length > 0) {
        return data.errors[key].map((k, i) => {
          return (
            <li className="font-size-1" key={`${key}-${k}`}>
              {k}
            </li>
          );
        });
      } else {
        return (
          <li className="font-size-1" key={`${key}`}>
            {key} errors
          </li>
        );
      }
    });
    return errorItems;
  } else {
    return <li className="font-size-1">Something</li>;
  }
};

export const errorFormater = (data, duration) => {
  const returnData = {
    message: data.message ? data.message : "Api Error",
    description: errorItemsNode(data),
    duration: duration,
  };
  console.log("returnData", returnData);
  return returnData;
};
