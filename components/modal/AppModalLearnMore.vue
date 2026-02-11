<template>
    <global-modal
        :breakpoints="{'575px': '95vw'}"
        :position="position"
        :pt="{
    content: {class: ['bg-back-black-sections md:p-8 sx:p-5']}
      }"
        v-model="model">
        <div class="flex items-start justify-between gap-2.5 mb-2.5">
            <h3 class="text-white font-unbounded sx:text-xl md:text-3xl uppercase">Форма обратной связи</h3>
            <button @click="model = false">
                <AppImgClose class="w-6 h-6 stroke-description-text-color"/>
            </button>
        </div>
        <form @submit.prevent="submitForm">
            <h5 class="text-description-text-color dynamic-carddesc-font sx:font-normal md:font-medium mb-5
">Оставьте свои данные, чтобы {{ present.title }}</h5>
            <div class="flex flex-col gap-4">
                <div>
                    <label class="mb-2 inline-block sx:text-xs md:text-base"
                           for="fullName">Ваши данные</label>
                    <input
                        v-model="formData.fullName"
                        placeholder="ФИО"
                        id="fullName"
                        name="fullName"
                        class="input"
                        type="text">
                </div>
                <div class="custom-inputmask">
                    <label
                        class="mb-2 inline-block sx:text-xs md:text-base"
                        for="phone">Ваш телефон</label>
                    <InputMask
                        v-model="formData.phone"
                        :pt="{input: {class: ['border-transparent']}}"
                        class="input"
                        id="phone"
                        mask="+7 (999) 999-99-99"
                        placeholder="+7 (___) ___-__-__"/>
                </div>
                <input type="hidden" name="id" :value="dispatchId">
                <input type="hidden" name="title" :value="dispatchTitle">
                <div class="flex sx:items-start md:items-center gap-2 custom-checkbox text-white md:mb-2">
                    <Checkbox
                        id="privacy"
                        :pt="{
            root: {class: ['w-6 h-4']},
            input: {class: ['w-6 h-4 border-none']},
            icon: {class: ['w-2.5 h-2.5 stroke-white']}
            }"
                        v-model="formData.isConfidential"
                        :binary="true"/>
                    <label
                        class="inline-block leading-[130%]"
                        for="privacy">Я ознакомлен(-а) с <a
                        :href="useRuntimeConfig().public.baseHostUrl + '/storage/files/legal/policy.pdf'"
                        target="_blank"
                        class="underline">Политикой
                        конфиденциальности</a></label>
                </div>
                <button
                    :disabled="!validateForm()"
                    type="submit"
                    class="red-button py-3 disabled:bg-opacity-20">
                    Оставить заявку
                </button>
            </div>
        </form>
    </global-modal>
    <AppSuccess v-model="success" :download="downloadLink"/>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
    autoZIndex: {
        type: Boolean,
        default: false,
    },

    baseZIndex: {
        type: Number,
        default: 1000,
    },

    currentCard: {
        type: Object || undefined,
        default: () => {
        }
    },

    position: {
        type: String
    },

    dispatchId: {
        type: Number || String,
    },

    dispatchTitle: {
        type: String
    },
    presentation: {
        type: Boolean,
        default: false,
        required: false
    }
})


const present = computed(() => {
    if (props.presentation) {
        return {
            title: 'получить презентацию',
            download: useRuntimeConfig().public.baseHostUrl + '/assets/images/stork_presentation.pdf'
        }
    } else {
        return {
            title: 'наилучшее предложение',
            download: null
        }
    }
});

const downloadLink = ref(null);
const success = ref(false);

// watch(() => model.value, (newVal) => {
//     success.value = newVal;
//
//     downloadLink.value = present.value.download;
//
// });


const formData = reactive({
    isConfidential: true,
    phone: '',
    fullName: ''
})

const loading = ref(false)

const validateForm = () => {
    return formData.fullName && formData.phone && formData.isConfidential && !loading.value;
}

const submitForm = async () => {
  loading.value = true
    try {
        const response = await fetch(useRuntimeConfig().public.baseURL + '/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: formData.fullName,
                phone: formData.phone,
                isConfidential: formData.isConfidential,
                dispatch_title: props.dispatchTitle,
                dispatch_id: props.dispatchId
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();


        if (props.presentation) {
            downloadLink.value = present.value.download;
        }

        // console.log('Email sent successfully:', responseData);
        model.value = !model.value;


        //success.value = !success.value;

        //emit('success', success.value)

        formData.fullName = formData.phone = "";
        formData.isConfidential = false;
        navigateTo('/thanks?success=true&pdf=true', {redirectCode: 301})
    } catch (error) {
        console.error('Failed to send email:', error);
    }
    loading.value = false
};

</script>
