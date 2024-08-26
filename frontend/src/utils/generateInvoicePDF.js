import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export const generateInvoicePDF = (order) => {
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor("#121212");
    doc.rect(0, 0, 210, 297, "F");

    // Title Section
    doc.setFontSize(22);
    doc.setTextColor("#4CAF50");
    doc.setFont("helvetica", "bold"); 
    doc.text("Invoice", 105, 20, { align: "center" });

    // Order Details Section
    doc.setFontSize(12);
    doc.setTextColor("#ddd");

    
    doc.setFont("helvetica", "bold");
    doc.text(`Order ID:`, 14, 40);
    doc.text(`Date:`, 14, 50);
    doc.text(`Total Amount:`, 14, 60);
    doc.text(`Payment Id:`, 14, 70);

    
    doc.setFont("helvetica", "normal");
    doc.text(`${order.orderId}`, 50, 40);
    doc.text(`${new Date(order.createdAt).toLocaleDateString()}`, 50, 50);
    doc.text(`$${order.total.toFixed(2)}`, 50, 60);
    doc.text(`${order.payment.paymentId}`, 50, 70);

    // Order Items Section
    autoTable(doc, {
      startY: 90,
      head: [
        [
          { content: "Product", styles: { fillColor: "#333" } },
          { content: "Quantity", styles: { fillColor: "#333" } },
          { content: "Price", styles: { fillColor: "#333" } },
          { content: "Total", styles: { fillColor: "#333" } },
        ],
      ],
      body: order.products.map((product) => [
        { content: product.name, styles: { textColor: "#ddd" } },
        { content: product.quantity, styles: { textColor: "#ddd" } },
        { content: `$${product.price.toFixed(2)}`, styles: { textColor: "#ddd" } },
        { content: `$${(product.price * product.quantity).toFixed(2)}`, styles: { textColor: "#ddd" } },
      ]),
      theme: "grid",
      styles: {
        halign: "center",
        fillColor: "#1e1e1e",
        textColor: "#ddd",
        lineColor: "#333",
        lineWidth: 0.5,
      },
    });

    // Footer Section
    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text("This is an automated invoice.", 105, doc.internal.pageSize.height - 20, { align: "center" });

    doc.save(`Invoice_${order.orderId}.pdf`);
  };