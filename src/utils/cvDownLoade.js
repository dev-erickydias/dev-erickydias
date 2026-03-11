const handleDownload = () => {
  const pdfUrl = "/Ericky_Dias_CV_EN_2026.pdf";
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Ericky_Dias_CV_EN_2026.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default handleDownload;
