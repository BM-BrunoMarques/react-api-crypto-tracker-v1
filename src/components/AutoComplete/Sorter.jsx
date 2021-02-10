export const Sorter = (data, searchText) =>
  data
    .filter((prof) => {
      // Filter results by doing case insensitive match on name here
      return prof.label.toLowerCase().includes(searchText.toLowerCase());
    })
    .sort((a, b) => {
      // Sort results by matching name with keyword position in name
      if (
        a.value.toLowerCase().indexOf(searchText.toLowerCase()) >
        b.value.toLowerCase().indexOf(searchText.toLowerCase())
      ) {
        return 1;
      } else if (
        a.value.toLowerCase().indexOf(searchText.toLowerCase()) <
        b.value.toLowerCase().indexOf(searchText.toLowerCase())
      ) {
        return -1;
      } else {
        if (a.value > b.value) return 1;
        else return -1;
      }
    });
