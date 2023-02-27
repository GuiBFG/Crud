import Swal from 'sweetalert2';

export const messageErrors = () => {
  void Swal.fire({
    title: 'Preencha os campos vazios!',
    icon: 'warning',
    confirmButtonColor: '#41B8D2',
    confirmButtonText: 'OK',
  });
};
