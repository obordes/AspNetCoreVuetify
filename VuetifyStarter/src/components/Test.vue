<template>
    <div>
        <v-data-table class="elevation-3"
                      :headers="headers"
                      :items="items"
                      :hide-actions="true"
                      :select-all="false"
                      item-key="name"
                      :expand="true"
                      XXX:pagination.sync="pagination"
                      XXX:rows-per-page-items="[2, 10, { text: 'All', value: -1 }]">
            <!-- Header template
            <template slot="headers" slot-scope="props">
                <tr>
                    <th>
                        <v-checkbox primary
                                    hide-details
                                    @click.native="toggleAll"
                                    :input-value="props.all"
                                    :indeterminate="props.indeterminate"></v-checkbox>
                    </th>
                    <th v-for="header in props.headers" :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                        @click="changeSort(header.value)">
                        <v-icon>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                </tr>
            </template> -->

            <!-- Header cell template -->
            <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                    <span slot="activator">
                        {{ props.header.text }}
                    </span>
                    <span>
                        {{ props.header.text }} tooltip
                    </span>
                </v-tooltip>
            </template>

            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <!--<td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.sodium }}</td>
                    <td class="text-xs-right">{{ props.item.calcium }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>-->
                </tr> 
            </template>

            <!-- Expand template -->
            <template slot="expand" slot-scope="props">
              <v-card flat>
                  <v-card-text>{{ props.item.protein }}</v-card-text>
              </v-card>
            </template>

            <!-- Footer template -->
            <template slot="footer">
              <td colspan="100%">
                <strong>This is an extra footer</strong>
              </td>
            </template> 
        </v-data-table>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        data() {
            return {
                headers: [
                    { text: 'Dessert (100g serving)', align: 'left', sortable: false, value: 'name' },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    //{ text: 'Protein (g)', value: 'protein' },
                    //{ text: 'Sodium (mg)', value: 'sodium' },
                    //{ text: 'Calcium (%)', value: 'calcium' },
                    //{ text: 'Iron (%)', value: 'iron' }
                ],
                items: [
                    { value: false, name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
                    { value: false, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
                    { value: false, name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
                    { value: false, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
                    { value: false, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
                    { value: false, name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
                    { value: false, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
                    { value: false, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
                    { value: false, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
                    { value: false, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' }
                ],
            }
        },

        mounted: function () {
            this.$store.dispatch('setTitle', 'Test')
        }
    }
</script>

<style>
</style>
