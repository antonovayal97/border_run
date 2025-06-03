export const useBackButtonStore = defineStore('backButton', {
    state: () => ({
      url: "/",
      isVisible: false
    }),
    actions: {
      setUrl(url: string) {
        this.url = url;
      },
      setIsVisible(visible: boolean) {
        this.isVisible = visible;
      }
    },
  });