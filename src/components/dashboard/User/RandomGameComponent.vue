<script setup>
import Axios from '@/utils/axios'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { vConfetti } from '@neoconfetti/vue'

const perPage = ref(10)
const page = ref(1)
const userLists = ref([])
const selectedUsersList = ref([])
const selectedUserListId = ref(null)
const recentWinners = ref([])
const showConfeti = ref(false)

const fetchUserLists = async () => {
  try {
    const response = await Axios.get(`/lists?page=${page.value}&perPage=${perPage.value}`)

    userLists.value = response?.data?.lists?.data

    if (userLists?.value?.length > 0) {
      const firstUserListId = userLists?.value[0]?.id
      fetchUsersInUserList(firstUserListId)
    }
  } catch (error) {
    console.log('error on console', error)
  }
}

const handleUserListChange = (event) => {
  const selectedUserListId = event.target.value
  console.log('selectedUserListId', selectedUserListId)

  fetchUsersInUserList(selectedUserListId)
}

const fetchUsersInUserList = async (userListId) => {
  try {
    const url = `/lists/${userListId}/users`
    const response = await Axios.get(url)

    console.log('response', response)

    selectedUsersList.value = response.data.users_list.users
    selectedUserListId.value = response.data.users_list.id
  } catch (error) {
    // toast.error(error.response?.data?.message)
    console.log('error on console', error)
  }
}

// /lists/:id/pick-random-winner
const pickRandomWinner = async (userListId) => {
  try {
    const url = `/lists/${userListId}/pick-random-winner`
    const response = await Axios.get(url)

    console.log('response', response)

    if (response.status == 200) {
      let winnerUserEmail = response?.data?.winner_user?.email
      recentWinners.value.push(winnerUserEmail)
      showConfeti.value = true
    }
    setTimeout(() => {
      showConfeti.value = false
    }, 2000)
  } catch (error) {
    toast.error(error.response?.data?.message)
    console.log('error on console', error)
  }
}

const handleClearWinners = () => {
  recentWinners.value = []
}

onMounted(() => {
  fetchUserLists()
})
</script>

<template>
  <div>
    <h1 class="mb-2">Random Game</h1>
    <div class="card">
      <div
        class="flex justify-center min-w-full"
        v-if="showConfeti"
        v-confetti="{ particleCount: 200, force: 0.3 }"
      />
      <div class="card-body">
        <div class="upper-body mb-32">
          <div class="flex flex-col gap-3">
            <p class="text-sm text-black">
              Select users from the dropdown list or manually add them using the textarea below.
              After finalizing the list, click the 'Pick Random' button to choose a lucky winner.
            </p>

            <p>Select List:</p>
            <select
              v-if="userLists?.length > 0"
              class="form-select"
              name="userList"
              @change="(e) => handleUserListChange(e)"
            >
              <option v-for="(userlist, key) in userLists" :value="userlist.id" :key="key">
                {{ userlist.list_name }}
              </option>
            </select>

            <hr class="mt-5" />
            <p class="text-sm text-black">
              You can also add multiple students who are not in the list by entering their email
              addresses, separated by commas. Any new email addresses will be appended to the end of
              the user list.
            </p>

            <p class="font-bold">The Lucky Pool</p>
            <textarea
              name="user-list"
              id="user-list"
              class="form-textarea"
              rows="6"
              :value="selectedUsersList.map((user) => user.email).join(', ')"
            ></textarea>
            <p class="text-xs text-black">
              Did you know? The random selection here is powered by an algorithm, not true
              randomness—computers can't roll dice! This process involves using the current time or
              other changing system data as a seed to generate random numbers.
            </p>

            <div class="flex flex-wrap gap-2">
              <span class="font-bold">Recent Winners:</span>
              <p class="recent-winner max-w-full" v-for="winners in recentWinners">
                {{ winners }}🎉
              </p>
            </div>
          </div>
          <button @click="handleClearWinners()" class="text-[#0085DB] text-lg mt-3">
            [ Clear List 🔃]
          </button>
        </div>
        <div class="lower-body flex justify-center items-center mb-10">
          <button
            class="flex items-center justify-center gap-4 border-2 border-[#F8C076] px-28 py-4 rounded-[30px] text-lg text-[#F8C076] font-bold bg-[#FCFCFC]"
            @click="pickRandomWinner(selectedUserListId)"
          >
            Pick a Random Winner
            <img src="@/assets/images/icons/dice.svg" alt="dice" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
