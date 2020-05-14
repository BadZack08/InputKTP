let formInput,
    buttonKtp,
    listKtp,
    bodyTable,
    buttonDelete,
    checkAll,
    checkList,

    //input field
    no_ktp,
    nama_lengkap

formInput       = document.querySelector('.form-ktp');
buttonKtp       = document.querySelector('.form-ktp-button');
listKtp         = document.querySelector('.list-ktp');
bodyTable       = document.querySelector('#dataKtp');
buttonDelete    = document.querySelector('.btn-delete');
checkAll        = document.querySelector('#checkAll');
checkList       = document.querySelectorAll('.check-list');
no_ktp          = document.querySelector('#no_ktp');
nama_lengkap    = document.querySelector('#nama_lengkap');

// click button save to localstorage
buttonKtp.addEventListener('click', saveKtp);

checkAll.addEventListener('click', function() {
    if(checkAll.checked){
        Array.from(document.querySelectorAll('.check-list')).forEach(item => {
            item.checked = true;
        })
    } else {
        Array.from(document.querySelectorAll('.check-list')).forEach(item => {
            item.checked = false;
        })
    }
})

buttonDelete.addEventListener('click', function() {
    let ktp = fromStorage();

    let ids = [];

    const checked = Array.from(document.querySelectorAll('.check-list')).filter(item => item.checked === true)

    if (checked.length > 0){
        checked.forEach(item => {
            let id = +item.getAttribute('data-id');
            ids.push(id)
        })
    } else {
        alert('Silahkan tandai datanya')
    }

    console.log(ids, '[variable ids]');

    return;
    const filterKtp = ktp.filter(item => !ids.includes(item.id));

    updateStorage(filterKtp)
})

function saveKtp()
{
    const data_ktp = {
        no_ktp: no_ktp.value,
        nama_lengkap: nama_lengkap.value
    }

    savetoStorage(data_ktp);

    showKtp();
}

function fromStorage()
{
    var array_ktp = JSON.parse(localStorage.getItem('ktp') || '[]');
    return array_ktp;
}

function updateStorage(data)
{
    localStorage.setItem('ktp', JSON.stringify(data));
    showKtp()
}

function savetoStorage( data_ktp ){

    var array_ktp, id; //initialisasi variable

    array_ktp = JSON.parse(localStorage.getItem('ktp') || '[]');

    id = array_ktp.length + 1 * new Date().getTime();

    array_ktp.push({ 
        id: id, 
        no_ktp: data_ktp.no_ktp , 
        nama_lengkap:data_ktp.nama_lengkap, 
        time: get_time()});

    localStorage.setItem('ktp', JSON.stringify(array_ktp));

    clearInput();
}

function clearInput()
{
    // formInput.value = "";
}

function showKtp()
{
    let data, markup, no = 1;
    data = JSON.parse(localStorage.getItem('ktp') || '[]');

    markup = ``;
    if(data.length > 0) {
        data.forEach(item => {
            markup += `
                <tr class="row-${item.id}">
                    <td> <input type="checkbox" class="check-list" data-id="${item.id}"/> </td>
                    <td> ${no++} </td>
                    <td> ${item.no_ktp} </td>
                    <td> ${item.nama_lengkap} </td>
                    <td> - </td>
                    <td> - </td>   
                    <td> - </td>             
                </tr>
            `
        })
    }
    bodyTable.innerHTML = markup;
}

function get_time()
{
    let current, hours, minutes, seconds;
    current = new Date();
    hours   = current.getHours();
    minutes = current.getMinutes();
    seconds = current.getSeconds();
    return hours +':'+minutes+':'+seconds
}

    showKtp()