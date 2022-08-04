export default function useSanitize() {
  const sanitizeHtml = function(text: string) {
    const div = document.createElement('div');
    const textNode = document.createTextNode(text);
    div.appendChild(textNode);
    return div.innerHTML;
  };
  return {
    sanitizeHtml: sanitizeHtml,
  };
}
