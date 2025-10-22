export async function createUser(userInfo) {
  try {
    const newUser = await this.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        isSuscribed: userInfo.subscribe,
      },
      select: {
        id: true,
      },
    });
    return newUser.id;
  } catch (error) {
    console.error("Error creating user", error);
    throw new Error("Failed to create user");
  }
}

export async function getUsers(name, email, phone) {
  try {
    const users = this.findMany({
      where: {
        name: name
          ? {
              contains: name,
            }
          : undefined,
        email: email
          ? {
              equals: email,
            }
          : undefined,
        phone: phone
          ? {
              equals: phone,
            }
          : undefined,
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        bookings: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error finding users:", error);
    throw new Error("Failed to find users");
  }
}

export async function getUserById(userId) {
  try {
    const user = await this.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        bookings: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user", error);
    throw new Error("Failed to fetch user");
  }
}

export async function updateUserInfo(userId, userInfo) {
  try {
    const user = await this.update({
      where: { id: userId },
      data: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        isSuscribed: userInfo.subscribed,
      },
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(userId) {
  try {
    await this.delete({
      where: { id: userId },
    });
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

export async function createTrip(tripInfo) {
  try {
    const newTrip = await this.create({
      data: {
        destination: tripInfo.destination,
        startDate: tripInfo.startDate,
        endDate: tripInfo.endDate,
        price: tripInfo.price,
        description: tripInfo.description,
        itinerary: tripInfo.itinerary,
        recommendations: tripInfo.recommendations,
        policies: tripInfo.policies,
        includedItems: tripInfo.includedItems,
        images: tripInfo.images,
        notes: tripInfo.notes,
        paymentPlanId: tripInfo.paymentPlanId,
      },
      select: {
        id: true,
      },
    });
    return newTrip.id;
  } catch (error) {
    console.error("Error creating new trip:", error);
    throw new Error("Failed to create trip");
  }
}

export async function getPlans() {
  try {
    const plans = await this.findMany();
    return plans;
  } catch (error) {
    console.error("Error fetching payment plans:", error);
    throw new Error("Failed to fetch payment plans");
  }
}

export async function createPlan(planData) {
  try {
    const newPlan = await this.create({
      data: {
        name: planData.name,
        installments: {
          createMany: {
            data: planData.installments,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return newPlan.id;
  } catch (error) {
    console.error("Error creating payment plan:", error);
    throw new Error("Failed to create payment plan");
  }
}

export async function getItems() {
  try {
    const items = await this.findMany();
    return items;
  } catch (error) {
    console.error("Error fetching included items:", error);
    throw new Error("Failed to fetch included items");
  }
}

export async function createItem(itemData) {
  try {
    const newItem = await this.create({
      data: {
        name: itemData.name,
      },
      select: {
        id: true,
      },
    });
    return newItem.id;
  } catch (error) {
    console.error("Error creating included item:", error);
    throw new Error("Failed to create included item");
  }
}
