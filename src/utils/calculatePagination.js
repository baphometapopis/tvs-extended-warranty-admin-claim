export function calculatePagination(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // Ensure currentPage is within valid range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  
    const visibleItems = totalItems > 0 ? endIndex - startIndex + 1 : 0;
  
    return {
      totalItems,
      totalPages,
      currentPage,
      startIndex,
      endIndex,
      visibleItems,
    };
  }
  