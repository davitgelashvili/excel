var objectkey;
var objectval;

document.getElementById("fileUpload").addEventListener("change", function(event) {
    selectedFile = event.target.files[0];
    console.log($('input').val())
});
document.getElementById("uploadExcel").addEventListener("click", function() {
    if (selectedFile) {
      var fileReader = new FileReader('../base.xls');
      fileReader.onload = function(event) {
        var data = event.target.result;

        var workbook = XLSX.read(data, {
          type: "binary"
        });
        console.log(workbook)
        workbook.SheetNames.forEach((sheet, index) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          $('.select').append(`
            <select id="${index}">
                <option value="">${sheet}</option>
            </select>
          `)
          rowObject.map((item)=>{
            insert(item, index)
          })
        });
      };
      fileReader.readAsBinaryString(selectedFile);
    }
});

function insert(item, index){
  objectkey = Object.keys(item)
  objectval = Object.values(item);

  $(`#${index}`).append(`
    <option>${item[objectkey]}<option>
  `)
}
  