export const useOrderStore = defineStore('order', {
  state: () => ({
    cityId: null,
    choosenDate: null,
    phone: "",
    address: "",
    count: 1,
    isWhatsapp: false,
    customerChatId: null
  }),
  actions: {
    setCity(city_id: any) {
      this.cityId = city_id;
    },
    setChoosenDate(choosen_date: any) {
      this.choosenDate = choosen_date;
    },
    setPhone(phone: any) {
      this.phone = phone;
    },
    setAddress(address: any) {
      this.address = address;
    },
    setCount(count: any) {
      this.count = count;
    },
    setIsWhatsapp(isWhatsapp: any) {
      this.isWhatsapp = isWhatsapp;
    },
    setCustomerChatId(customerChatId: any) {
      this.customerChatId = customerChatId;
    }
  },
});