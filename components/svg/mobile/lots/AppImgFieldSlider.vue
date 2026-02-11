<template>
  <svg class="relative" width="103" height="47" viewBox="0 0 103 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="30" rx="8" fill="#121212"/>
    <rect id="animatedRect" width="4" height="30" fill="white"/>
    <path
        class="animatedRectFinger"
        d="M75.8041 19.2646C73.91 18.3666 72.6001 16.4371 72.6001 14.2016C72.6001 11.1088 75.1073 8.60156 78.2001 8.60156C81.2929 8.60156 83.8001 11.1088 83.8001 14.2016C83.8001 16.4371 82.4902 18.3666 80.5961 19.2646"
        stroke="#CA1F26" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path
        class="animatedRectFinger"
        d="M75.8 27.0008C75.8 25.6752 74.7256 24.6008 73.4 24.6008C72.0744 24.6008 71 25.6752 71 27.0008V32.6008C71 39.228 76.3728 44.6008 83 44.6008C89.6272 44.6008 95 39.228 95 32.6008V27.0008C95 25.6752 93.9256 24.6008 92.6 24.6008C91.2744 24.6008 90.2 25.6752 90.2 27.0008V25.4008C90.2 24.0752 89.1256 23.0008 87.8 23.0008C86.4744 23.0008 85.4 24.0752 85.4 25.4008V23.8008C85.4 22.4752 84.3256 21.4008 83 21.4008C81.6744 21.4008 80.6 22.4752 80.6 23.8008V14.2008C80.6 12.8752 79.5256 11.8008 78.2 11.8008C76.8744 11.8008 75.8 12.8752 75.8 14.2008V27.0008Z"
        fill="white"/>
    <path
        class="animatedRectFinger"
        d="M75.8 27.0008C75.8 25.6752 74.7256 24.6008 73.4 24.6008C72.0744 24.6008 71 25.6752 71 27.0008V32.6008C71 39.228 76.3728 44.6008 83 44.6008C89.6272 44.6008 95 39.228 95 32.6008V27.0008C95 25.6752 93.9256 24.6008 92.6 24.6008C91.2744 24.6008 90.2 25.6752 90.2 27.0008V25.4008C90.2 24.0752 89.1256 23.0008 87.8 23.0008C86.4744 23.0008 85.4 24.0752 85.4 25.4008V23.8008C85.4 22.4752 84.3256 21.4008 83 21.4008C81.6744 21.4008 80.6 22.4752 80.6 23.8008V14.2008C80.6 12.8752 79.5256 11.8008 78.2 11.8008C76.8744 11.8008 75.8 12.8752 75.8 14.2008M75.8 27.0008V31.8008V14.2008M75.8 27.0008V14.2008"
        stroke="#121212" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

</template>

<script setup>

</script>

<style scoped>

#animatedRect {
  animation: rectAnimation 4s ease infinite;
  }

@keyframes rectAnimation {
  0% { transform: translateX(80px)}
  20% { transform: translateX(80px)}
  50% { transform: translateX(20px)}
  70% { transform: translateX(20px)}
  90% { transform: translateX(80px)}
  100% { transform: translateX(80px)}
  }

.animatedRectFinger {
  animation: rectAnimationFinger 4s ease infinite;
  }

@keyframes rectAnimationFinger {
  0% { transform: translateX(4px); opacity: 0; }
  20% { transform: translateX(4px); opacity: 0; }
  50% { transform: translateX(-56px); opacity: 0; }
  70% { transform: translateX(-56px); opacity: 1; }
  90% { transform: translateX(4px); opacity: 1; }
  100% { transform: translateX(4px); opacity: 0; }
  }

</style>

