export const useMainButtonStore = defineStore('mainButton', {
    state: () => ({
      text: "...",
      url: "/",
      color: "#00DC82",
      isVisible: true,
      isProgress: false
    }),
    actions: {
      setText(text: string) {
        this.text = text;
      },
      setUrl(url: string) {
        this.url = url;
      },
      setColor(color: string) {
        this.color = color;
      },
      setIsVisible(visible: boolean) {
        this.isVisible = visible;
      },
      setIsProgress(progress: boolean)
      {
        this.isProgress = progress
      }
    },
  });