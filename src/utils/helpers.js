// src/utils/helpers.js
export const getStatusColor = (status) => {
  const colors = {
    'Open': 'blue',
    'Planned': 'orange', 
    'In Progress': 'purple',
    'Done': 'green'
  };
  return colors[status] || 'default';
};

export const getCategoryColor = (category) => {
  const colors = {
    'Feature': 'cyan',
    'Bug': 'red',
    'UI': 'magenta',
    'Enhancement': 'geekblue'
  };
  return colors[category] || 'default';
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
